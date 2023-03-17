import { isLoginState } from "@/states/is-login";
import { isEmptyObject } from "@/utils/isEmptyObject";
import axios, { Method } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const Survey = () => {
    const router = useRouter();
    const { survey_id } = router.query;
    const [surveyGroupRole, setSurveyGroupRole] = useState(Object);
    const [surveyGroupItems, setSurveyGroupItems] = useState(Object);
    const [surveyResultInfo, setSurveyResultInfo] = useState(Object);
    const [currentId, setCurrentId] = useState(Number);
    const [user, setUser] = useState(Object);
    const [isLogin, setIsLoginState] = useRecoilState(isLoginState);

    const nextSurvey = (isUp: boolean) => {
        if(!isUp && currentId == 0) return;
        if(isUp && currentId == surveyGroupItems.length - 1) return;
        isUp? setCurrentId(currentId + 1) : setCurrentId(currentId - 1);
    }

    useEffect(() => {
        if(!isEmptyObject(surveyResultInfo)){
            const process = document.querySelector('.survey-process') as HTMLElement;
            process.innerHTML = '';
            surveyGroupItems.forEach((element:any, index:number) => {
                const span = document.createElement('span');
                span.style.padding = '5px';
                span.style.color = currentId == index? "black" : "white";
                span.innerHTML = '●';
                process.appendChild(span);
            });
            const question = document.querySelector('.survey-question') as HTMLElement;
            const answers = document.querySelector('.survey-answers') as HTMLElement;
            question.innerHTML = `<h1>${surveyResultInfo[currentId].survey.question}</h1>`;
            answers.innerHTML = '';
            surveyResultInfo[currentId].answers.forEach((element:any) => {
                const answer = document.createElement('div');
                answer.className = 'survey-answer';
                answer.innerHTML = `
                    <input type="radio" name="answer" id="answer${element.id}" value="${element.id}" />
                    <label htmlFor="answer${element.id}">${element.answerText}</label>
                `;
                answer.style.padding = '3px';
                answers.appendChild(answer);
            });
        }
    }, [currentId, surveyResultInfo]);

    useEffect(() => {
        const res = axios({
            method: 'get' as Method,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            url: `/api/survey/role/${survey_id}/detail`,
        })
            .then((res) => {
                const result = res.data;
                if(result.statusCode == 404){
                    router.push('/404');
                }
                if (result.statusCode == 200 || result.statusCode == '200') {
                    setSurveyGroupRole(result.contents.surveyGroupRole);
                    setSurveyGroupItems(result.contents.surveyGroupItems);
                    setSurveyResultInfo(result.contents.surveyResultInfo);
                    setCurrentId(0);
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
            <div style={{display: 'flex', flexDirection: "column",justifyContent: 'center', alignItems: 'center'}}>
                <div className="survey-process">
                </div>
                <div className="survey-question" style={{padding: 5}}>
                    질문
                </div>
                <div className="survey-answers" style={{display: 'flex', flexDirection:"column", padding: 5}}>
                    <div className="survey-answer">
                        <input type="radio" name="answer" id="answer1" value="1" />
                        <label htmlFor="answer1">대답1</label>
                    </div>
                </div>
                <div className="btn-group" style={{flexDirection: "row", padding: 10}}>
                    <button onClick={() => nextSurvey(false)}>이전</button>
                    <button onClick={() => nextSurvey(true)}>다음</button>
                </div>
            </div>
        </>
    );
}

export default Survey;