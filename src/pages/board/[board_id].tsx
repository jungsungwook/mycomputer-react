import { isLoginState } from "@/states/is-login";
import axios, { Method } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const Board = () => {
    const router = useRouter();
    const { board_id } = router.query;
    const [board, setBoard] = useState(Object);
    const [user, setUser] = useState(Object);
    const [isLogin, setIsLoginState] = useRecoilState(isLoginState);

    useEffect(() => {
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
            <div>
                <h1>{board.title}</h1>
                <h2>{board.content}</h2>
            </div>
            {
                board.isMine ? <div>내꺼</div>: <div>내꺼아님</div>
            }
        </>
    );
}

export default Board;