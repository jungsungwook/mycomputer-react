import Card from "@/components/cards";
import { isLoginState } from "@/states/is-login";
import { timeConvert } from "@/utils/timezoneConvet";
import axios, { Method } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const SurveyIndex = () => {
    const [survey, setSurvey] = useState([]);
    const [isLogin, setIsLoginState] = useRecoilState(isLoginState);

    useEffect(() => {
        const res = axios({
            method: "get" as Method,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            url: `/api/survey/role`,
        }).then((res) => {
            const result = res.data;
            if (result.statusCode == 200 || result.statusCode == "200") {
                setSurvey(result.contents);
            }
        });
    }, []);

    return (
        <>
            <div id='div-surveys' style={
                {
                    margin: '10px',
                    display: 'flex',
                    flexWrap: 'wrap',
                }
            }>
                {
                    survey.map((item: any, index: number) => {
                        return (
                            <Card
                                key={index}
                                card_type="survey"
                                item_id={item.id}
                                title={item.subject}
                                content={item.description}
                                // img_url="https://images.mypetlife.co.kr/content/uploads/2018/07/09155938/23098550_1717292138292321_9032508045317373952_n.jpg"
                                created_at={timeConvert(item.createdAt)}
                                updated_at={item.updatedAt}
                                user_id={item.createdBy}
                            />
                        )
                    })
                }
            </div>
        </>
    );
};

export default SurveyIndex;