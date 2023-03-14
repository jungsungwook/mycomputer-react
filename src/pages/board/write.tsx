import axios, { Method } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const BoardWrite = () => {
    const [user, setUser] = useState(Object);
    const [isLogin, setIsLogin] = useState('false');
    return (
        <>
            <div>
                <h1>Board Write Page</h1>
            </div>
        </>
    );
};

export default BoardWrite;