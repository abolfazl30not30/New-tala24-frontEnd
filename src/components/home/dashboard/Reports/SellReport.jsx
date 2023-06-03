import React, {useEffect, useState} from "react";
import '../../../../style/request.css'
import api from '../../../../api/api'
import {useNavigate} from "react-router-dom";
import {EnglishToPersian} from "../../../../helper/EnglishToPersian";
import {SeparateNumber} from "../../../../helper/SeparateNumber";


const SellReport = () => {
    const [goldReports, setGoldReports] = useState([])


    useEffect(() => {
        const getData = async () => {
            const getDataRes = await api.get("request/price")
            if (getDataRes) {
                setGoldReports([...getDataRes])
            }
        }
        getData()
    }, []);

    const navigate = useNavigate()

    const successStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 250,
        height: 300,
        borderRadius: 6,
        bgcolor: '#3c3c3c',
        border: '2px solid #000',
        boxShadow: 24,
        padding: '15px'
    };

    const errorStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 250,
        height: 325,
        borderRadius: 6,
        bgcolor: '#3c3c3c',
        border: '2px solid #000',
        boxShadow: 24,
        padding: '15px'
    };

    return (
        <div className={'mx-9 mt-5 w-full'}>
            <div className={'text-white bg-[#252525] mt-10 rounded-[8px] p-5'}>
                <h2 className={'mb-10 mt-2 font-bold text-white text-2xl'}>
                    گزارش ریالی
                </h2>
                <div className={'overflow-scroll'}>
                    {
                        goldReports ?
                            <>
                                <table>
                                    <tr>
                                        <th className={'p-4 text-center'}>شماره</th>
                                        <th className={'p-4 text-center'}>نوع</th>
                                        <th className={'p-4 text-center'}>مبلغ</th>
                                        <th className={'p-4 text-center'}>وزن</th>
                                        <th className={'p-4 text-center'}>تاریخ و ساعت </th>
                                        <th className={'p-4 text-center'}>شماره پیگیری</th>
                                        <th className={'p-4 text-center'}>وضعیت</th>
                                    </tr>
                                    {
                                        goldReports?.map((report, index) => (
                                            <tr key={index}>
                                                <td className={'p-3 text-center'}>{index + 1}</td>
                                                <td className={'p-3 text-center flex justify-center'}>{report.type === "buyGold" ? <p className="authorizedSuccessful">خرید طلا</p> :
                                                    <p className="authorizedFailed">فروش طلا</p>}</td>
                                                <td className={'p-3 text-center'}>{EnglishToPersian(SeparateNumber(report.price))}ریال</td>
                                                <td className={'p-3 text-center'}>{EnglishToPersian(SeparateNumber(report.weight))}گرم</td>
                                                <td className={'p-3 text-center'}>{EnglishToPersian(report.createAt)}</td>
                                                <td className={'p-3 text-center'}>{EnglishToPersian(report.issueTracking)}</td>
                                                <td className={'p-3 text-center flex justify-center'}>
                                                    {
                                                        report.status === "pend"
                                                            ? <p className={'statusPending'}>
                                                                در حال بررسی
                                                            </p>
                                                            : report.status === "reject"
                                                                ? <p className={'authorizedFailed'}>
                                                                    رد شده
                                                                </p>
                                                                : report.status === "accept"
                                                                    ? <p className={'authorizedSuccessful'}>
                                                                        موفق
                                                                    </p>
                                                                    : <p className={'authorizedSuccessful'}>
                                                                        موفق
                                                                    </p>

                                                    }</td>
                                            </tr>
                                        ))
                                    }
                                </table>
                            </>
                            :
                            <h2 className={"text-[red] mt-5 text-[1.3rem] text-center"}>
                                تراکنشی انجام نشده!
                            </h2>
                    }
                </div>
            </div>
        </div>
    )
}

export default SellReport;