import { BiArrowBack } from "react-icons/bi";
import DatePickerButton from "../Date";
import topBackground from "../Images/bg.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Win({onDataFetch}) {
  const navbarStyle = {
    height: "60px",
    display: "flex",
    alignItems: "center",
  };
  const backStyle = {
    backgroundImage: `url(${topBackground})`,
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    position:'relative',
    paddingBottom:'',
  };
  const cardStyle={
    width:'400px',
    display:'flex',
    flexDirection:'column',
    padding:'20px',
  };
  const navigate= useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  useEffect(() => {
    fetchData(changedate(selectedDate), changedate(selectedEndDate));
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEndDateChange= (date) => {
    setSelectedEndDate(date);
  };

  const handleSubmit = async() => {
    console.log("From Date:", selectedDate);
    console.log("To Date:", selectedEndDate);
   
    const startdate1=changedate(selectedDate);
    const enddate1= changedate(selectedEndDate);
    console.log(startdate1)
    console.log(enddate1)
    try {
      await fetchData(startdate1, enddate1);
      // setIsSubmit(true);
    } catch (error) {
      // setErrorText("Username or password incorrect");

    }

  };

  const fetchData = async ( startdate1, enddate1) => {
    // Your fetchData implementation here
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "ci_session=7c38fc1fc455fca9846d688fb8343f5c7ea71bee"
    );

    var raw = JSON.stringify({
      env_type: "Prod",
      app_key: "jAFaRUulipsumXLLSLPFytYvUUsgfh",
      unique_token: "un5ChwLA8EJqiLqCBolQwC0gY31AAL",
      date_from: startdate1,
      date_to: enddate1
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "https://kalyanmilanofficialmatka.in/api-wining-history-data",
      requestOptions
    );
    const result = await response.json();
    if(result?.status==true)onDataFetch(true , result);
    else onDataFetch(false,null);
    // console.log(result);
  };

  const changedate =( selectedDate)=>{
    if(selectedDate===null)return;
    const startday = selectedDate.getDate(); // Returns the day of the month (1-31)
    const startmonth = selectedDate.getMonth()+1; // Returns the month (0-11)
    const startyear = selectedDate.getFullYear();
    const date= startmonth+'/'+startday+'/'+startyear;
    console.log(date);
    return date;
  }

  const back = () => {
    navigate('/imp');
  };

  return (
    <>
      <div className="bg-custom-purple text-white" style={navbarStyle}>
        <button className="px-4" onClick={()=>back()}>
          <BiArrowBack size={24} />
        </button>
        <div>
          <h1 className="text-white px-3">WIN HISTORY</h1>
        </div>
      </div>
      <div style={backStyle} className="text-white">
        <div className="flex justify-center item-center p-5" >
          <div className="" style={cardStyle} >
            <p className="inline-block rounded p-3 border border-white mb-2 bg-blue-950 w-full" >Select Dates</p>
            <p className="mb-2">From Date</p>
            <DatePickerButton selectedDate={selectedDate} onDateChange={handleDateChange} />
            <p className="mb-2 mt-2" >To Date</p>
            <DatePickerButton selectedDate={selectedEndDate} onDateChange={handleEndDateChange} />
            <div className="flex justify-center  ">
              <button className="p-3 border border-black-500 rounded mt-4 bg-green-500 w-full" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Win;
