import axios, { Method } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Survey = () => {
    const router = useRouter();
    const { survey_id } = router.query;
    const [surveyGroupRole, setSurveyGroupRole] = useState(Object);
    const [surveyGroupItems, setSurveyGroupItems] = useState(Object);
    const [user, setUser] = useState(Object);
    const [isLogin, setIsLogin] = useState('false');

    useEffect(() => {
        const res = axios({
            method: 'get' as Method,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            url: `/api/survey/role/${survey_id}`,
        })
            .then((res) => {
                const result = res.data;
                if (result.statusCode == 200 || result.statusCode == '200') {
                    setSurveyGroupRole(result.contents.surveyGroupRole);
                    setSurveyGroupItems(result.contents.surveyGroupItems);
                    console.log(result.contents)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [survey_id]);

    return (
        <>
            <div>
                <h1>{surveyGroupRole.subject}</h1>
                <h2>{surveyGroupRole.description}</h2>
            </div>
        </>
    );
}

export default Survey;