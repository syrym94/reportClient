import React from "react";
import axios from 'axios';
import "./App.css";
import ReactTable from 'react-table'
import 'react-table/react-table.css'

export default class Report extends React.Component {
  constructor(){
      super()
      this.state = {
        data:[],
        dateFrom:'',
        dateTo:'',
        catergory:[],
        selectedCategory:''
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event){
    const {name,value} = event.target
    this.setState({[name]: value})
  }
  async componentDidMount(){
    const url = "http://37.18.30.25:3002"
    await fetch(url,{
      method: "GET"}).then(response =>response.json()).then(result =>{
        this.setState({catergory:result})
      })
  }
  async handleSubmit(event){
    event.preventDefault()
    let a = axios.post('http://37.18.30.25:3002',{
      data: this.state
    }).then(result =>{
      // console.log(result.data)
      if(result.data.floatArr.length === 0 && result.data.integerArr.length === 0){
        alert('В данной категории не было продаж за указанный период')
      }
      else {
      let data = [...this.state.data];
      let sellQuantityLetter = ''
      let rawArr = []
      let rawArrSellQuantity = []
      let rawArrSellPrice = []
      for(var i=0;i<result.data.integerArr.length;i++){
      rawArr.push((result.data.integerArr[i].profit/result.data.ProfitResultInt).toFixed(2))
      rawArrSellQuantity.push((result.data.integerArr[i].sellQuantity/result.data.QuantityResultInt).toFixed(2))
      rawArrSellPrice.push((result.data.integerArr[i].sellPrice/result.data.PriceResultInt).toFixed(2))
      data.push({'Товар': result.data.integerArr[i].assortment.name,'Продажи':(result.data.integerArr[i].sellQuantity).toFixed(2),'Продажи%': (result.data.integerArr[i].sellQuantity/result.data.QuantityResultInt).toFixed(2),'Выручка':result.data.integerArr[i].sellPrice,'Выручка%':(result.data.integerArr[i].sellPrice/result.data.PriceResultInt).toFixed(2),'Прибыль':result.data.integerArr[i].profit,'Прибыль%':(result.data.integerArr[i].profit/result.data.ProfitResultInt).toFixed(2)});
      }
      for(var y=0;y<result.data.floatArr.length;y++){
      rawArr.push((result.data.floatArr[y].profit/result.data.ProfitResultFloat).toFixed(2))
      rawArrSellQuantity.push((result.data.floatArr[y].sellQuantity/result.data.QuantityResultFloat).toFixed(2))
      rawArrSellPrice.push((result.data.floatArr[y].sellPrice/result.data.PriceResultFloat).toFixed(2))
      data.push({'Товар': result.data.floatArr[y].assortment.name,'Продажи':(result.data.floatArr[y].sellQuantity).toFixed(2),'Продажи%': (result.data.floatArr[y].sellQuantity/result.data.QuantityResultFloat).toFixed(2),'Выручка':result.data.floatArr[y].sellPrice,'Выручка%':(result.data.floatArr[y].sellPrice/result.data.PriceResultFloat).toFixed(2),'Прибыль':result.data.floatArr[y].profit,'Прибыль%':(result.data.floatArr[y].profit/result.data.ProfitResultFloat).toFixed(2)});
      }
      data.sort((a,b)=> (a.Прибыль < b.Прибыль) ? 1 : -1)
      rawArr.sort(function(a, b){return b-a})
      let calculatedArr = []
      let numberedArr = []
      let arrLetter = []
      function calc(arr){
          return arr.reduce(function(a,b){
            calculatedArr.push(a+b)
            return a + b
          }, 0);
        }
      for(let l=0;l<rawArr.length;l++){
        numberedArr.push(Number(rawArr[l]))
      }
      calc(numberedArr)
      let data1 = []
      for(let g=0;g<calculatedArr.length;g++){
        if(calculatedArr[g]<80){
          sellQuantityLetter = 'A'
        } else if(calculatedArr[g]>81 && calculatedArr[g]<95){
          sellQuantityLetter = 'B'
        } else{
          sellQuantityLetter = 'C'
        }
        arrLetter.push(sellQuantityLetter)
        data1.push({'#':g+1,'ПрибыльABC':arrLetter[g],'Товар': data[g].Товар,'Продажи': data[g].Продажи,'Продажи%': data[g]['Продажи%'] ,'Выручка': data[g].Выручка,'Выручка%':data[g]['Выручка%'],'Прибыль':data[g].Прибыль,'Прибыль%':data[g]['Прибыль%']})
      }
      data1.sort((a,b)=> (a.Продажи < b.Продажи) ? 1 : -1)
        rawArrSellQuantity.sort(function(a, b){return b-a})
        let calculatedArr1 = []
        let numberedArr1 = []
        let arrLetter1 = []
        function calc1(arr){
          return arr.reduce(function(a,b){
            calculatedArr1.push(a+b)
            return a + b
          }, 0);
        }
        for(let l=0;l<rawArrSellQuantity.length;l++){
          numberedArr1.push(Number(rawArrSellQuantity[l]))
        }
        calc1(numberedArr1)
        let data2 = []
        for(let g=0;g<calculatedArr1.length;g++){
          if(calculatedArr1[g]<80){
            sellQuantityLetter = 'A'
          } else if(calculatedArr1[g]>81 && calculatedArr1[g]<95){
            sellQuantityLetter = 'B'
          } else{
            sellQuantityLetter = 'C'
          }
          arrLetter1.push(sellQuantityLetter)
          data2.push({'#':g+1,'ПрибыльABC':arrLetter[g],'ПродажиABC':arrLetter1[g],'Товар': data[g].Товар,'Продажи': data[g].Продажи,'Продажи%': data[g]['Продажи%'] ,'Выручка': data[g].Выручка,'Выручка%':data[g]['Выручка%'],'Прибыль':data[g].Прибыль,'Прибыль%':data[g]['Прибыль%']})
        }

      data2.sort((a,b)=> (a.Выручка < b.Выручка) ? 1 : -1)
      rawArrSellPrice.sort(function(a, b){return b-a})
      let calculatedArr2 = []
      let numberedArr2 = []
      let arrLetter2 = []
      function calc2(arr){
        return arr.reduce(function(a,b){
          calculatedArr2.push(a+b)
          return a + b
        }, 0);
      }
      for(let l=0;l<rawArrSellPrice.length;l++){
        numberedArr2.push(Number(rawArrSellPrice[l]))
      }
      calc2(numberedArr2)
      let data3 = []
      for(let g=0;g<calculatedArr2.length;g++){
        if(calculatedArr2[g]<80){
          sellQuantityLetter = 'A'
        } else if(calculatedArr2[g]>81 && calculatedArr2[g]<95){
          sellQuantityLetter = 'B'
        } else{
          sellQuantityLetter = 'C'
        }
        arrLetter2.push(sellQuantityLetter)
        data3.push({'#':g+1,'ПрибыльABC':arrLetter[g],'ПродажиABC':arrLetter1[g],'ВыручкаABC':arrLetter2[g],'Товар': data[g].Товар,'Продажи': data[g].Продажи,'Продажи%': data[g]['Продажи%'] ,'Выручка': data[g].Выручка,'Выручка%':data[g]['Выручка%'],'Прибыль':data[g].Прибыль,'Прибыль%':data[g]['Прибыль%']})
      }
        console.log(data3,'%%%%%%%%%%')
      this.setState({data:data3})
    }
    })
    this.setState({data: []})
}
  render() {
    const columns = [
      {
        Header:'#',
        accessor:'#',
        width:50
      },
      {
        Header:'Товар',
        accessor:'Товар',
        width: 400
      },
      {
        Header:'Продажи',
        accessor:'Продажи'
      },
      {
        Header:'Продажи %',
        accessor:'Продажи%'
      },
      {
        Header:'Выручка',
        accessor:'Выручка'
      },
      {
        Header:'Выручка %',
        accessor:'Выручка%'
      },
      {
        Header:'Прибыль',
        accessor:'Прибыль'
      },
      {
        Header:'Прибыль %',
        accessor:'Прибыль%'
      },
      {
        Header:'ПродажиABC',
        accessor:'ПродажиABC'
      },
      {
        Header:'ВыручкаABC',
        accessor:'ВыручкаABC'
      },
      {
        Header:'ПрибыльABC',
        accessor:'ПрибыльABC'
      }
    ]
    return (
      <div style = {{width: '90%', marginLeft: '5%'}}>
        <div>
          <div className='container'>
          {/* <table className='table'>
              <tr>
                <th>#</th>
                <th>Товар</th>
                <th>Продажи</th>
                <th>Продажи %</th>
                <th>Выручка</th>
                <th>Выручка %</th>
                <th>Прибыль</th>
                <th>Прибыль %</th>
                <th>Продажи</th>
                <th>Выручка</th>
                <th>Прибыль</th>
              </tr>
            </table> */}
            <ReactTable 
            columns={columns}
            data = {this.state.data}
            filterable
            noDataText={'Идет запрос ...'}
            defaultPageSize={20}
            >
            </ReactTable>
            <form  onSubmit={this.handleSubmit}>
              <select name='selectedCategory' onChange={this.handleChange}>
              {this.state.catergory.map((value, index) => {
                return <option value={value}  key={index}>{value}</option>
              })}
              </select>
              <input className='dateFrom' name='dateFrom' type="date" data-date-format="YYYY-MM-DD" defaultValue={this.state.dateFrom} onChange={this.handleChange}/>
              <input className='dateTo' name='dateTo' type="date" data-date-format="YYYY-MM-DD" defaultValue={this.state.dateTo} onChange={this.handleChange}/>
              <button type="submit" value="Submit">Запросить данные</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
