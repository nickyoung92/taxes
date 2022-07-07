import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react';
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState({
    filingStatus: '',
    wages: '',
    shortTerm: '',
    longTerm: '',
    deductionOption: '',
    wages: 0,
    shortTerm: '',
    longTerm: '',
  });

  const [singleTaxTable, setSingleTaxTable] = useState({
    tenPercent: 9950,
    twelvePercent: 40525,
    twentytwoPercent: 86375,
    twentyfourPercent: 164925,
    thirtytwoPercent: 209425,
    thirtyfivePercent: 523600,
    thirtysevenPercent: 0
  })

  const [marriedJointTaxTable, setMarriedJointTaxTable] = useState({
    tenPercent: 19900,
    twelvePercent: 81050,
    twentytwoPercent: 172750,
    twentyfourPercent: 329850,
    thirtytwoPercent: 418850,
    thirtyfivePercent: 628300,
    thirtysevenPercent: 0
  })

  const [marriedSeparateTaxTable, setMarriedSeparateTaxTable] = useState({
    tenPercent: 9950,
    twelvePercent: 40525,
    twentytwoPercent: 86375,
    twentyfourPercent: 164925,
    thirtytwoPercent: 209425,
    thirtyfivePercent: 314150,
    thirtysevenPercent: 0
  })

  const [headOfHouseholdTaxTable, setHeadOfHouseholdTaxTable] = useState({
    tenPercent: 14200,
    twelvePercent: 54200,
    twentytwoPercent: 86350,
    twentyfourPercent: 164900,
    thirtytwoPercent: 209400,
    thirtyfivePercent: 523600,
    thirtysevenPercent: 0
  })

  const [deductions, setDeductions] = useState(null)

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    if(event.target.name == 'deductionOption') {
      if(event.target.value == 'Standard') {
        if(data.filingStatus == 'Single' || data.filingStatus == 'Married Filing Separate') {
          setDeductions('10000')
        } else if (data.filingStatus == 'Married Filing Joint') {
          setDeductions('20000')
        } else {
          setDeductions('15000')
        }
      }
    } else if (event.target.name == 'filingStatus') {
      if(data.deductionOption == 'Standard'  ) {
        if (event.target.value == 'Single' || event.target.value == 'Married Filing Separate') {
          setDeductions('10000')
        } else if (event.target.value == 'Married Filing Joint') {
          setDeductions('20000')
        } else {
          setDeductions('15000')
        }
      }
    }
  };

  const handleDeductions = (event) => {
    setDeductions(event.target.value)
  }
  
  const isItemizing = () => {
    if(data.deductionOption == 'Itemized') {
      return <div><label>Deductions</label><br/><input type='number' onChange={handleDeductions} name='deductions' /><br/></div>
    }
  }

  const getTaxableIncome = () => {
    const taxableIncome = data.wages-deductions
    if(taxableIncome < 0) {
      taxableIncome = 0
    }
    return <p>{taxableIncome}</p>
  }

  const getIncomeTax = () => {
    const taxableIncome = data.wages-deductions
    const tax = 0
    if(taxableIncome < 0) {
      taxableIncome = 0
    }
    if(data.filingStatus == 'Single'){
      if(taxableIncome > singleTaxTable.thirtyfivePercent) {
        tax = ((taxableIncome - singleTaxTable.thirtyfivePercent)*.37)+157803
      } else if (taxableIncome > singleTaxTable.thirtytwoPercent) {
        tax = ((taxableIncome - singleTaxTable.thirtytwoPercent)*.35)+47842.1
      } else if (taxableIncome > singleTaxTable.twentyfourPercent) {
        tax = ((taxableIncome - singleTaxTable.twentyfourPercent)*.32)+33602.42
      } else if (taxableIncome > singleTaxTable.twentytwoPercent) {
        tax = ((taxableIncome - singleTaxTable.twentytwoPercent)*.24)+14750.66
      } else if (taxableIncome > singleTaxTable.twelvePercent) {
        tax = ((taxableIncome - singleTaxTable.twelvePercent)*.22)+4663.88
      } else if (taxableIncome > singleTaxTable.tenPercent) {
        tax = ((taxableIncome - singleTaxTable.tenPercent)*.12)+995
      } else {
        tax = taxableIncome*.1
      }
    } else if(data.filingStatus == 'Married Filing Joint' || data.filingStatus == 'Qualifying Widow'){
      if(taxableIncome > marriedJointTaxTable.thirtyfivePercent) {
        tax = ((taxableIncome - marriedJointTaxTable.thirtyfivePercent)*.37)+168992.25
      } else if (taxableIncome > marriedJointTaxTable.thirtytwoPercent) {
        tax = ((taxableIncome - marriedJointTaxTable.thirtytwoPercent)*.35)+95685.1
      } else if (taxableIncome > marriedJointTaxTable.twentyfourPercent) {
        tax = ((taxableIncome - marriedJointTaxTable.twentyfourPercent)*.32)+67205.42
      } else if (taxableIncome > marriedJointTaxTable.twentytwoPercent) {
        tax = ((taxableIncome - marriedJointTaxTable.twentytwoPercent)*.24)+29501.66
      } else if (taxableIncome > marriedJointTaxTable.twelvePercent) {
        tax = ((taxableIncome - marriedJointTaxTable.twelvePercent)*.22)+9327.88
      } else if (taxableIncome > marriedJointTaxTable.tenPercent) {
        tax = ((taxableIncome - marriedJointTaxTable.tenPercent)*.12)+1990
      } else {
        tax = taxableIncome*.1
      }
    } else if(data.filingStatus == 'Married Filing Separate'){
      if(taxableIncome > marriedSeparateTaxTable.thirtyfivePercent) {
        tax = ((taxableIncome - marriedSeparateTaxTable.thirtyfivePercent)*.37)+84495.50
      } else if (taxableIncome > marriedSeparateTaxTable.thirtytwoPercent) {
        tax = ((taxableIncome - marriedSeparateTaxTable.thirtytwoPercent)*.35)+47842.1
      } else if (taxableIncome > marriedSeparateTaxTable.twentyfourPercent) {
        tax = ((taxableIncome - marriedSeparateTaxTable.twentyfourPercent)*.32)+33602.42
      } else if (taxableIncome > marriedSeparateTaxTable.twentytwoPercent) {
        tax = ((taxableIncome - marriedSeparateTaxTable.twentytwoPercent)*.24)+14750.66
      } else if (taxableIncome > marriedSeparateTaxTable.twelvePercent) {
        tax = ((taxableIncome - marriedSeparateTaxTable.twelvePercent)*.22)+4663.88
      } else if (taxableIncome > marriedSeparateTaxTable.tenPercent) {
        tax = ((taxableIncome - marriedSeparateTaxTable.tenPercent)*.12)+995
      } else {
        tax = taxableIncome*.1
      }
    } else if(data.filingStatus == 'Married Filing Separate'){
      if(taxableIncome > headOfHouseholdTaxTable.thirtyfivePercent) {
        tax = ((taxableIncome - headOfHouseholdTaxTable.thirtyfivePercent)*.37)+156353.75
      } else if (taxableIncome > headOfHouseholdTaxTable.thirtytwoPercent) {
        tax = ((taxableIncome - headOfHouseholdTaxTable.thirtytwoPercent)*.35)+46384.10
      } else if (taxableIncome > headOfHouseholdTaxTable.twentyfourPercent) {
        tax = ((taxableIncome - headOfHouseholdTaxTable.twentyfourPercent)*.32)+32144.42
      } else if (taxableIncome > headOfHouseholdTaxTable.twentytwoPercent) {
        tax = ((taxableIncome - headOfHouseholdTaxTable.twentytwoPercent)*.24)+13292.66
      } else if (taxableIncome > headOfHouseholdTaxTable.twelvePercent) {
        tax = ((taxableIncome - headOfHouseholdTaxTable.twelvePercent)*.22)+6219.88
      } else if (taxableIncome > headOfHouseholdTaxTable.tenPercent) {
        tax = ((taxableIncome - headOfHouseholdTaxTable.tenPercent)*.12)+1420
      } else {
        tax = taxableIncome*.1
      }
    }
    

    return <p>{tax}</p>
  }

  const getCapitalGainsTax = () => {

    return <p>{(data.wages - deductions)}</p>
  }

  const getNIITax = () => {

    return <p>{(data.wages - deductions)}</p>
  }

  
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Taxes are fun but coding is funner!
        </h1>

        <p className={styles.description}>
         Answer the questions down below
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>What's your filing status?</h2>
            <div>
              <input type='radio' onChange={handleChange} value='Single' name='filingStatus' /><label>Single</label><br/>
              <input type='radio' onChange={handleChange} value='Married Filing Joint' name='filingStatus' /><label>Married Filing Joint</label><br/>
              <input type='radio' onChange={handleChange} value='Married Filing Separate' name='filingStatus' /><label>Married Filing Separate</label><br/>
              <input type='radio' onChange={handleChange} value='Head of Household' name='filingStatus' /><label>Head of Household</label><br/>
              <input type='radio' onChange={handleChange} value='Qualifying Widow' name='filingStatus' /><label>Qualifying Widow</label>
            </div>
          </div>

          <div className={styles.card}>
            <h2>Standard or Itemized?</h2>
            <div>
              <input type='radio' onChange={handleChange} value='Standard' name='deductionOption' /><label>Standard</label><br/>
              <input type='radio' onChange={handleChange} value='Itemized' name='deductionOption' /><label>Itemized</label><br/>
              {isItemizing()}
            </div>
          </div>

          <div href="https://nextjs.org/learn" className={styles.card}>
            <h2>Income Details</h2>
            <div>
              <label>Wages</label><br/><input type='number' onChange={handleChange} name='wages'/><br/>
              <label>Short Term Gains/(Losses)</label><br/><input type='number' onChange={handleChange} name='shortTerm'/><br/>
              <label>Long Term Gains/(Losses)</label><br/><input type='number' onChange={handleChange} name='longTerm'/><br/>
            </div>
          </div>


          <div
            className={styles.card}
          >
            <h2>Results</h2>
            <p>
              Filing Status: {data.filingStatus}<br/>
              Wages: {data.wages}<br/>
              Investment Income: {data.investmentIncome}<br/>
              Deductions: {deductions}<br/>
              Taxable Income: {getTaxableIncome()}<br/>
              Income Tax: {getIncomeTax()}<br/>
              Capital Gains Tax: {getCapitalGainsTax()}<br/>
              NIIT: {getNIITax()}<br/>
            </p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
