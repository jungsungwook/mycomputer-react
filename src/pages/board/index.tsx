import Card from "@/components/cards";
import Header from "@/components/header";
import { isLoginState } from "@/states/is-login";
import { timeConvert } from "@/utils/timezoneConvet";
import axios, { Method } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const BoardIndex = () => {
    const [boards, setBoards] = useState([]);
    const [isLogin, setIsLoginState] = useRecoilState(isLoginState);

    useEffect(() => {
        const res = axios({
            method: 'get' as Method,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            url: `/api/board`,
        }).then((res) => {
            const result = res.data;
            if (result.statusCode == 200 || result.statusCode == '200') {
                setBoards(result.contents);
            }
        });
    }, []);

    return (
        <>
            <div className="write-btn-fixed">
                {
                    isLogin == true ?
                        <Link href={'/board/write'}>
                            글쓰기
                        </Link>
                        :
                        <Link href={'/auth/signin'}>
                            글쓰기
                        </Link>
                }
            </div>
            <div id='div-boards' style={
                {
                    margin: '10px',
                    display: 'flex',
                    flexWrap: 'wrap',
                }
            }>
                {
                    boards.map((item: any, index) => {
                        return (
                            <Card
                                key={index}
                                card_type="board"
                                item_id={item.id}
                                title={item.title}
                                content={item.content}
                                // img_url="https://images.mypetlife.co.kr/content/uploads/2018/07/09155938/23098550_1717292138292321_9032508045317373952_n.jpg"
                                created_at={timeConvert(item.createdAt)}
                                updated_at={item.updatedAt}
                                user_id={item.createdById}
                            />
                        )
                    })
                }
            </div>
        </>
    )
};

export default BoardIndex;