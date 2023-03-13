import axios, { Method } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Board = () => {
    const router = useRouter();
    const { board_id } = router.query;
    const [board, setBoard] = useState(Object);
    const [user, setUser] = useState(Object);
    const [isLogin, setIsLogin] = useState('false');

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
                setIsLogin('true');
            } else {
                localStorage.setItem('isLogin', 'false');
                setIsLogin('false');
                setUser({});
            }
        }).catch((err) => {
        });

        const res = axios({
            method: 'get' as Method,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            url: `/api/board/${board_id}`,
        })
            .then((res) => {
                const result = res.data;
                if (result.statusCode == 200 || result.statusCode == '200') {
                    setBoard(result.contents);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [board_id]);

    return (
        <>
            <div id="menu-bar" className='fixedBox'>
                {
                    isLogin == 'true'
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
                                            setIsLogin('false');
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
            <div>
                <h1>{board.title}</h1>
                <h2>{board.content}</h2>
            </div>
        </>
    );
}

export default Board;