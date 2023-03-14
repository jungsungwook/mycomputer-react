import axios, { Method } from "axios";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentPathState } from "@/states/current-path";
import { isLoginState } from "../states/is-login";
import { useRouter } from "next/router";

const Header = () => {
    const router = useRouter();
    const [isLogin, setIsLoginState] = useRecoilState(isLoginState);
    const [user, setUser] = useState(Object);
    const [currentPath, setCurrentPathState] = useRecoilState(currentPathState);

    useEffect(() => {
        setCurrentPathState(router.pathname);
    }, [router.pathname]);

    useEffect(() => {
        const isLogin = axios({
            method: 'get' as Method,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            url: `/api/auth/islogin`,
        }).then((res) => {
            const result = res.data;
            if (result.statusCode == 200 || result.statusCode == '200') {
                setUser({
                    id: result.contents.id,
                    email: result.contents.email,
                    name: result.contents.name,
                    customId: result.contents.customId,
                });
                localStorage.setItem('isLogin', 'true');
                setIsLoginState(true);
            } else {
                localStorage.setItem('isLogin', 'false');
                setIsLoginState(false);
                setUser({});
            }
        }).catch((err) => {
            localStorage.setItem('isLogin', 'false');
            setIsLoginState(false);
            setUser({});
        });
    }, [currentPath]);

    return (
        <>
            <Head>
                <title>MyComputer</title>
                <meta name="description" content="MyComputer" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div id="menu-bar" className='fixedBox'>
                {
                    isLogin == true
                        ?
                        <div style={
                            {
                                float: 'right',
                                margin: '0 10px 0 0'
                            }
                        }><div>
                                <p style={
                                    {
                                        float: 'left',
                                        margin: '0 10px 0 0'
                                    }
                                }>{user.name}님 환영합니다.</p>
                                <p style={{ cursor: 'pointer', float: 'left' }} onClick={
                                    () => {
                                        const res = axios({
                                            method: 'get' as Method,
                                            headers: {
                                                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                                            },
                                            url: `/api/auth/signout`,
                                        }).then((res) => {
                                        }).catch((err) => {
                                        }).finally(() => {
                                            localStorage.removeItem('isLogin');
                                            localStorage.removeItem('accessToken');
                                            setUser({});
                                            setIsLoginState(false);
                                        });
                                    }
                                }>
                                    | Logout |
                                </p>
                            </div>
                        </div>
                        :
                        <div style={
                            {
                                float: 'right',
                            }
                        }>
                            <Link href={'/auth/signin'}>
                                | Login |
                            </Link>
                            <Link href={'/auth/signup'}>
                                | Register |
                            </Link>
                        </div>
                }
                <div>
                    <Link href={'/'}>
                        | 홈 화면 |
                    </Link>
                    <Link href={'/board'}>
                        | 게시판 |
                    </Link>
                    <Link href={'/survey'}>
                        | 설문조사 |
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Header;