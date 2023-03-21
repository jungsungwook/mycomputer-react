import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Card from '@/components/cards'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios, { Method } from 'axios'
import { timeConvert, timezoneConvert } from '@/utils/timezoneConvet'
import { useRecoilState } from 'recoil'
import { isLoginState } from '@/states/is-login'
import Header from '@/components/header'

const Home = () => {
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

      }
    });
  }, []);

  return (
    <>
    </>
  )
}

export default Home