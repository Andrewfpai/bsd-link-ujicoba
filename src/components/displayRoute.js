import {useState, useEffect, useRef, useContext, useMemo, useCallback} from 'react'
import { useQuery } from '@tanstack/react-query'
import useDebounce from '../hooks/useDebounce'
// import useCreateRoute from '../hooks/useCreateRoute'
import { Flex, Spacer } from '@chakra-ui/react'
import ruteContext from '../context/ruteContext'
import awalTujuan from '../context/awalTujuan'
import Destination from '../assets/icon/target.png'
import CurrentLoc from '../assets/icon/location.png'
import Cancel from '../assets/icon/cancel.png'
import { useNavigate } from 'react-router-dom';

export default function Search(){

  const {ruteFinal, setRuteFinal} = useContext(ruteContext);
  const {noRuteFinal, setNoRuteFinal} = useContext(ruteContext);



  const options = { timeZone: "Asia/Jakarta", hour: "numeric", minute: "numeric", second: "numeric", hour12: false };
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], options));
  // const [currentTime, setCurrentTime] = useState("05:19");
 
  // const currentTime = useRef('04:00');

  const noRuteAwalMentah = useRef([])
  const noRuteAwalFinal = useRef([])
  const noRuteTujuan = useRef([])
  const noRuteAwalKetiga = useRef([])
  const noRuteAkhirKetiga = useRef([])
  const noRuteTengahKetiga = useRef([])

  const jamRuteAwalMentah = useRef([])
  const jamRuteAwalFinal = useRef([])
  const jamRuteTujuan = useRef([])
  const jamTerakhirRute1 = useRef()
  
  const jamAwalKetiga = useRef()
  const jamTengahKetiga = useRef()
  const jamAkhirKetiga = useRef()
  const jamTerakhirRute1Ketiga = useRef()
  const jamTerakhirRute2Ketiga = useRef()
  const {jamFinal, setJamFinal} = useContext(ruteContext)


  const navigate = useNavigate();

  const [titikAwal, setTitikAwal] = useState('')
  const [titikTujuan, setTitikTujuan] = useState('')

  const [dataOn, setDataOn] = useState(true);
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");
  // const [filteredData, setFilteredData] = useState([])
  const debouncedSearchTerm = useDebounce(search, 1000)
  // const createRoute = useCreateRoute(jumlahRute, ruteFinal.current)
  const count = useRef(0);
  
    

    // const [ruteAwal, setRuteAwal] = useState([])
    const ruteTitikAwal = useRef([])
    const ruteTitikTujuan = useRef([])
    
    const ruteAwalMentah = useRef([])
    // const [ruteAwalMentah, setRuteAwalMentah] = useState([])
    const [halteTransitAwalMentah, setHalteTransitAwalMentah] = useState([])
    
    const ruteTujuanMentah = useRef([])
    // const [ruteTujuanMentah, setRuteTujuanMentah] = useState([])
    const [halteTransitTujuanMentah, setHalteTransitTujuanMentah] = useState([])

    const ruteTengahMentah = useRef([])
    const ruteTengahFinal = useRef([])
  
    const [halteTransitTengahMentah, setHalteTransitTengahMentah] = useState([])

    const halteTransitDuaRute = useRef([])
    const ruteAwalFinal = useRef([])
    
    // const [ruteAwalFinal, setruteAwalFinal] = useState([]) //Rute 1 Final
    const [ruteTujuanFinal, setruteTujuanFinal] = useState([]) // Rute 2 Final
    
    const ruteAwalKetiga = useRef([])
    const ruteTujuanKetiga = useRef([])
    
    const [ruteDitemukan, setRuteDitemukan] = useState('') // Rute 2 Final
  
    // const ruteFinal = useRef([])

    
   

    useEffect(() => {
    count.current = count.current + 1;
  });
    

    const {data, isLoading, error} = useQuery({
      queryKey: ['data_halte'],
      queryFn: () => {
          return fetch(`https://raw.githubusercontent.com/Andrewfpai/bsd-link-library/main/bsd-link.json`)
            .then(res => res.json())
      },
        })

  const handleChange = useCallback((e) => {
    setSearch(e.target.value);
   
  }, [setSearch]);
  
  const handleChange2 = useCallback((e) => {
    setSearch2(e.target.value);
   
  }, [setSearch]);
        // untuk filter search bar
        const filteredData = useMemo(() => {
          if (!data?.nama_halte) {
            return [];
          }
          return data.nama_halte.filter((item) => {
            if (search === "") {
              return true;
            } else {
              return item?.toLowerCase()?.includes(search?.toLowerCase());
            }
          });
        }, [data, search]);
      
        const filteredData2 = useMemo(() => {
          if (!data?.nama_halte) {
            return [];
          }
          return data.nama_halte.filter((item) => {
            if (search2 === "") {
              return true;
            } else {
              return item?.toLowerCase()?.includes(search2?.toLowerCase());
            }
          });
        }, [data, search2]);
        

        //Untuk Nentuin titik Awal ada di rute mana aja --> hasil = [0,1,2]
        useEffect(() => {
          ruteTitikAwal.current = [] // Refresh isi dari rute Awal setiap kali user pilih tujuan baru
          ruteTitikTujuan.current = []
          
          
          

          // rute itu object dari semua-rute
          data?.semua_rute?.forEach((rute,index) => {   // halte disini artinya item di dalam array [1,2,3], berarti 1 object
       
            for (let key in rute.halte) { 
              let keyFix = key.replace(/_Second/g, "")
              const halteTanpa_ = keyFix.replace(/_/g, " ");              //akses object "halte" di dalam array "semua_rute"
              
              if (titikAwal === titikTujuan){
                break

              } else if (titikAwal===halteTanpa_ && !ruteTitikAwal.current.includes(index)){
                ruteTitikAwal.current.push(index)
                // setRuteAwal(ruteAwal => [...ruteAwal, index]);    //masukkin rutenya yang sesuai dengan titik awal
              
              } else if (titikTujuan === halteTanpa_ && !ruteTitikTujuan.current.includes(index)){
                ruteTitikTujuan.current.push(index)
              }
              

              

            }
          });  
        }, [data, titikAwal, titikTujuan]);


        //Untuk buat rute dari titik awal ke tujuan --> hasil = ["titikAwal", "halte2 lain", "Tujuan"]
        useEffect(() => {
          
          ruteAwalMentah.current = []
          setHalteTransitAwalMentah([]) // selalu reset ketika titik awal dan tujuan berubah
   
          ruteTujuanMentah.current = []
          setHalteTransitTujuanMentah([]) 

          jamRuteAwalMentah.current = []
         
      
          let done = false;
          let done2 = false;
          let posisiIndex = ''
          
          for (let i of ruteTitikAwal.current) {

            let defaultState = false;
            
            for (let key in data?.semua_rute[i]?.halte) { 
              
              let keyFix = key.replace(/_Second/g, "")
              let halteAkhir = Object.keys(data?.semua_rute[i].halte)[Object.keys(data?.semua_rute[i].halte).length-1].replace(/_Second/g, "")
              
              const halteTanpa_ = keyFix.replace(/_/g, " ");
              
             
              if ((halteTanpa_=== titikAwal && titikTujuan) || defaultState){ //Kalo belum sesuai titik awal jangan dibuat rutenya dulu, tapi kalo udah lewat boleh, mencegah kebuat rute yang berbalik arus
                
                
                if(halteTanpa_ ===titikAwal && titikTujuan){ // untuk ambil index array waktu yang sesuai
                  setCurrentTime(new Date().toLocaleTimeString([], options))
                  let jamTerdekat = data?.semua_rute[i]?.halte[key].find(jam => jam > currentTime);
                  let posisi = data?.semua_rute[i]?.halte[key].indexOf(jamTerdekat)
                  posisiIndex = posisi
                }
                
                let jamTerdekat = data?.semua_rute[i]?.halte[key].at(posisiIndex)
                jamRuteAwalMentah.current.push(jamTerdekat)
                
                
                
                defaultState = true
                ruteAwalMentah.current.push(halteTanpa_)
                
                if (key.includes("Second") && titikAwal === halteTanpa_){
                  ruteAwalMentah.current = []
                  ruteAwalMentah.current.push(halteTanpa_)
                  
                  jamRuteAwalMentah.current = []
                  jamRuteAwalMentah.current.push(jamTerdekat)


                  
                }
                // setRuteAwalMentah(ruteAwalMentah => [...ruteAwalMentah, halteTanpa_]);
                
                
                if ((Object.keys(data?.semua_rute[i].halte)[Object.keys(data?.semua_rute[i].halte).length-1] === key && halteAkhir !== titikTujuan.replace(/ /g, "_") )){
                  ruteAwalMentah.current = []
                  jamRuteAwalMentah.current = []
                  
                  
                  
                }

                // if ((Object.keys(data?.semua_rute[i].halte)[Object.keys(data?.semua_rute[i].halte).length-1] !== titikTujuan)){
                //   setRuteAwalMentah([])
                // }
                // if (key.includes("Second")){
                //     setRuteAwalMentah([])
                //     setRuteAwalMentah(ruteAwalMentah => [...ruteAwalMentah, halteTanpa_])
                //   }


                if(halteTanpa_ === titikTujuan && ruteAwalMentah){
                  done = true
                  noRuteAwalMentah.current = i.toString()
                  // setRuteTujuanMentah([]);
                  // setHalteTransitTujuanMentah([]);
                  setRuteDitemukan('1')
                  setHalteTransitAwalMentah([]);
                  
                  break;
                }
                

                if (data?.halte_transit.includes(halteTanpa_)){ //jika ada halte yang termasuk di dalam array halte transit, masukkin ke array
                  
                  
                  setHalteTransitAwalMentah(halteTransitAwalMentah => [...halteTransitAwalMentah, halteTanpa_+" "+i]);
         
                }
              }

              
            }
            if (done){break}



          }

          
          for (let i of ruteTitikTujuan.current) {
            
            for (let key in data?.semua_rute[i]?.halte) { 
              let keyFix = key.replace(/_Second/g, "")
              const halteTanpa_ = keyFix.replace(/_/g, " ");
              let halteAkhir = Object.keys(data?.semua_rute[i].halte)[Object.keys(data?.semua_rute[i].halte).length-1]

             
              if ( halteAkhir === key && halteTanpa_ !== titikTujuan){ // Jika halte terakhir di suatu rute dan tidak termasuk ke halte transit penyambung, kosongin/reset
                ruteTujuanMentah.current = []
                setHalteTransitTujuanMentah([])
                break
              }
              ruteTujuanMentah.current.push(halteTanpa_)
              // setRuteTujuanMentah(ruteTujuanMentah => [...ruteTujuanMentah, halteTanpa_])

              

              if ((halteTanpa_=== titikTujuan && key !== Object.keys(data?.semua_rute[i].halte)[0]) ){ //jika sudah ketemu tujuan, tapi tujuan itu bukan halte pertama suatu rute, misal tujuan halte sektor 1.3
                done2 = true
                
                break;
      
              }
              

              if (data?.halte_transit.includes(halteTanpa_)){ //jika ada halte yang termasuk di dalam array halte transit, masukkin ke array
                
                setHalteTransitTujuanMentah(halteTransitTujuanMentah => [...halteTransitTujuanMentah, halteTanpa_+" "+i]);
              
              }
            }
            if (done2){break}
          }
          // if (ruteAwalMentah.current.length !== 0 && ruteTujuanMentah.current.length !==0  ){
          //   ruteFinal.current = ruteAwalMentah.current.concat(ruteTujuanMentah.current)
          // }
        }, [titikTujuan, titikAwal,]);


        //Buat cek apakah rute awal dengan rute akhir memiliki rute transit yang sama
        useEffect(() => {
          let halteTransit1B= []
          halteTransitDuaRute.current = []
          // setruteTujuanFinal([])

          halteTransitAwalMentah.forEach(halte=>{
            let reformatTransit = halte.slice(0, -2)
            halteTransit1B.push(reformatTransit)
          })

          let done = false
          // const halteTransit2 = {}

          for (let halte of halteTransitTujuanMentah){
          
            let reformatTransit = halte.slice(0, -2) //PERBAIKAN 
            
            if (halteTransit1B.includes(reformatTransit)){
              
              halteTransitDuaRute.current.push(reformatTransit)
              // setHalteTransitMatch(halteTransitDuaRute => [...halteTransitDuaRute, reformatTransit])
              let defaultState = false
              let ruteTujuan = halte.charAt(halte.length-1) // ambil halte transitnya ada di rute mana, hasilnya 0,1,2
              
            }
            
          }
        }, [halteTransitAwalMentah, halteTransitTujuanMentah]);
        

        useEffect(() => {
         
          ruteAwalFinal.current = []
          setruteTujuanFinal([])

          jamRuteAwalFinal.current = []
          jamRuteTujuan.current = []

          let done = false
          let done2 = false
          let posisiIndex = ''
          let posisiIndex2 = ''

           for (let halte of halteTransitAwalMentah){
            
            let defaultState = false
            let ruteAwal1 = halte.charAt(halte.length-1)
            
            let halteAkhir = Object.keys(data?.semua_rute[ruteAwal1].halte)[Object.keys(data?.semua_rute[ruteAwal1].halte).length-1]
           
            for (let key in data?.semua_rute[ruteAwal1]?.halte) { 
                
                let keyFix = key.replace(/_Second/g, "")
                const halteTanpa_ = keyFix.replace(/_/g, " ");
                
                
                if ((halteTanpa_=== titikAwal) || defaultState){ //Kalo belum sesuai titik awal jangan dibuat rutenya dulu, tapi kalo udah lewat boleh, mencegah kebuat rute yang berbalik arus
                 
                  defaultState = true

                  
                  if(halteTanpa_ ===titikAwal){ // untuk ambil index array waktu yang sesuai, satu kali aja
                    setCurrentTime(new Date().toLocaleTimeString([], options))
                    let jamTerdekat = data?.semua_rute[ruteAwal1]?.halte[key].find(jam => jam > currentTime);
                    let posisi = data?.semua_rute[ruteAwal1]?.halte[key].indexOf(jamTerdekat)
                    posisiIndex = posisi
                  }
                  // setCurrentTime(new Date().toLocaleTimeString([], options))
                  
                  let jamTerdekat = data?.semua_rute[ruteAwal1]?.halte[key].at(posisiIndex)
                  jamRuteAwalFinal.current.push(jamTerdekat)
   
                  

                  // setruteAwalFinal(rute1 => [...rute1, halteTanpa_])
                  ruteAwalFinal.current.push(halteTanpa_)
                  
                  if ( halteAkhir === key && halteTransitDuaRute.current.at(-1) !== halteTanpa_){ // Jika halte terakhir di suatu rute dan tidak termasuk ke halte transit penyambung, kosongin/reset
                    ruteAwalFinal.current = []
                    jamRuteAwalFinal.current = []
                    // setruteAwalFinal([])
                  }
                  if (halteTransitDuaRute.current.at(-1) === halteTanpa_){ //jika halte berikut sama ada di dalam halte transit penyambung paling akhir, artinya loopingnya harus selesai
                    done = true
                    noRuteAwalFinal.current = ruteAwal1
                    jamTerakhirRute1.current = jamTerdekat
                    break;
                  }
                  
                 
                  if (key.includes("Second") && halteTanpa_ === titikAwal  && halteAkhir !== key ){
                    ruteAwalFinal.current = []
                    ruteAwalFinal.current.push(halteTanpa_)
                    
                    jamRuteAwalFinal.current = []
                    jamRuteAwalFinal.current.push(jamTerdekat)
                    // setruteAwalFinal([])
                    // setruteAwalFinal(rute1 => [...rute1, halteTanpa_])
                  }
                  

                  // if(halteTransitDuaRute.current.includes(halteTanpa_)){
                    
                  //   setRute1(rute1 => [...rute1, "---"]);
              
                  //   // break;
                  //   console.log("BREAK")

                  //   if (halteTransitDuaRute.current.at(-1) === halteTanpa_){ //jika halte berikut sama ada di dalam halte transit penyambung paling akhir, artinya loopingnya harus selesai
                  //     done = true
                  //     break;
                  //   }

                    
                  // }
                }
               
              }
            if (done){break}

          }



          for (let halte of halteTransitTujuanMentah){
          
            let defaultState = false
            let ruteBack1 = halte.charAt(halte.length-1)
            let halteAkhir = Object.keys(data?.semua_rute[ruteBack1].halte)[Object.keys(data?.semua_rute[ruteBack1].halte).length-1]

       
           
              for (let key in data?.semua_rute[ruteBack1]?.halte) { 
                  
                let keyFix = key.replace(/_Second/g, "")
                const halteTanpa_ = keyFix.replace(/_/g, " ");
                
                
                if (halteTransitDuaRute.current.at(-1) === halteTanpa_ || defaultState){
                  defaultState = true
                  setruteTujuanFinal(ruteTujuanFinal => [...ruteTujuanFinal, halteTanpa_])

                  
                  if(halteTransitDuaRute.current.at(-1) === halteTanpa_){ // untuk ambil index array waktu yang sesuai, satu kali aja
                    setCurrentTime(new Date().toLocaleTimeString([], options))
                    let jamTerdekat = data?.semua_rute[ruteBack1]?.halte[key].find(jam => jam > jamTerakhirRute1.current);
                    
                    let posisi = data?.semua_rute[ruteBack1]?.halte[key].indexOf(jamTerdekat)
                    posisiIndex2 = posisi
                  }

                  let jamTerdekat = data?.semua_rute[ruteBack1]?.halte[key].at(posisiIndex2)
                  jamRuteTujuan.current.push(jamTerdekat)
                  

                  if (key.includes("Second") && halteTransitDuaRute.current.at(-1) === halteTanpa_ ){
                    setruteTujuanFinal([])
                    setruteTujuanFinal(ruteTujuanFinal => [...ruteTujuanFinal, halteTanpa_])
                    
                    jamRuteTujuan.current = []
                    jamRuteTujuan.current.push(jamTerdekat)
                    
                  }
                  // setCurrentTime(new Date().toLocaleTimeString([], options))
                  
                  if ( halteAkhir === key && halteTanpa_!== titikTujuan){ // Jika halte terakhir di suatu rute dan tidak termasuk ke halte transit penyambung, kosongin/reset
                    setruteTujuanFinal([])
                    jamRuteTujuan.current = []
                    // setruteAwalFinal([])
                  }

                  if(halteTanpa_=== titikTujuan ){
                    noRuteTujuan.current = ruteBack1
                    // setruteTujuanFinal(ruteTujuanFinal => [...ruteTujuanFinal, "---"]);
                    done2 = true
                    break;
                  } 
                }


                

                
              }
            if (done2){
            
              setRuteDitemukan('2')
              break}

          }

        }, [halteTransitAwalMentah, halteTransitTujuanMentah]);


        


        useEffect(() => {
          let ruteGabungan = ruteTitikAwal.current.concat(ruteTitikTujuan.current)
          let done = false
          let halteTransitAwalReformat = []
          let halteTransitTujuanReformat = []
          
          let posisiIndex2 = ''
          
          
          ruteAwalKetiga.current = []
          ruteTujuanKetiga.current= []
          ruteTengahMentah.current = []
          ruteTengahFinal.current = []
          // console.log("COBA",halteTransitDuaRute.current)
          console.log("MASUK2")


          if (halteTransitDuaRute.current.length === 0){

            halteTransitAwalMentah.forEach(halte=>{
              let reformatTransit = halte.slice(0, -2)
              halteTransitAwalReformat.push(reformatTransit)
            })
            
            halteTransitTujuanMentah.forEach(halte=>{
              let reformatTransit = halte.slice(0, -2)
              halteTransitTujuanReformat.push(reformatTransit)
            })


            
            for (let i = 0; i < data?.semua_rute.length; i++) {
              // console.log(i)
              let defaultState = false
              let halteAkhir = Object.keys(data?.semua_rute[i].halte)[Object.keys(data?.semua_rute[i].halte).length-1]

              if (!ruteGabungan.includes(i)){
                
                for (let key in data?.semua_rute[i]?.halte){

                  let keyFix = key.replace(/_Second/g, "")
                  const halteTanpa_ = keyFix.replace(/_/g, " ");  
                  
                  
                  if (halteTransitAwalReformat.includes(halteTanpa_) || defaultState){
                    
                    
                    ruteTengahMentah.current.push(halteTanpa_)
                    defaultState = true

                    // if(halteTransitAwalReformat.includes(halteTanpa_)){ // untuk ambil index array waktu yang sesuai, satu kali aja
                    //   let jamTerdekat = data?.semua_rute[i]?.halte[key].find(jam => jam > jamTerakhirRute1Ketiga.current);
                    //   let posisi = data?.semua_rute[i]?.halte[key].indexOf(jamTerdekat)
                    //   posisiIndex2 = posisi
                    // }

                    // let jamTerdekat = data?.semua_rute[i]?.halte[key].at(posisiIndex2)
                    // jamTengahKetigaMentah.current?.push(jamTerdekat)

                    if(halteTransitTujuanReformat.includes(halteTanpa_)){
                      
                      noRuteTengahKetiga.current = i
                      done = true
                      break;
                    }
                    
                    if (key === halteAkhir && !done){
                      ruteTengahMentah.current = []
                
                    }
                    // console.log(ruteTengahMentah.current)
                  } 
                  
              }// end loop
              
            }

            
            
              if (done){break}
            }

              if (ruteTengahMentah.current.length !== 0){
                  
                // console.log("BREAK",ruteTengahMentah.current.slice().reverse())
                for (let halte of ruteTengahMentah.current.slice().reverse()){
                
                  
                  // console.log("halte",halte)
                  ruteTengahFinal.current.push(halte)
                  
                  
                  if (halteTransitAwalReformat.includes(halte)){
                    // console.log("halte",halte)
                    ruteTengahFinal.current.reverse()
                    break
                  }
                
      
                }
                
              }

              let haltePenyambung1= ruteTengahFinal.current[0] // Halte pertama dari ruteTengahFinal (penyambung ke rute 1)
              let haltePenyambung2 = ruteTengahFinal.current.at(-1) // Halte terakhir dari ruteTengahFinal (penyambung ke rute 2)
              let keep = []
              let keep2 = []
              let ruteKetigaMentah = []
              
              let posisiIndex1 = ''
              let keepJam = []
              let keepJam2 = []
              let jamKetigaMentah = []
           

              for (let i of ruteTitikAwal.current){
            
                let defaultState = false

                for (let key in data?.semua_rute[i]?.halte) { 
                  
                    let keyFix = key.replace(/_Second/g, "")
                    const halteTanpa_ = keyFix.replace(/_/g, " ");
                    let halteAkhir = Object.keys(data?.semua_rute[i].halte)[Object.keys(data?.semua_rute[i].halte).length-1].replace(/_Second/g, "")
                    
                    
                    if ((halteTanpa_=== titikAwal) || defaultState){ //Kalo belum sesuai titik awal jangan dibuat rutenya dulu, tapi kalo udah lewat boleh, mencegah kebuat rute yang berbalik arus
                      
                      defaultState = true
    
                      keep.push(halteTanpa_)

                      if(halteTanpa_ ===titikAwal){ // untuk ambil index array waktu yang sesuai, satu kali aja
                        setCurrentTime(new Date().toLocaleTimeString([], options))
                        let jamTerdekat = data?.semua_rute[i]?.halte[key].find(jam => jam > currentTime);
                        let posisi = data?.semua_rute[i]?.halte[key].indexOf(jamTerdekat)
                        posisiIndex1 = posisi
                      }
                      
                      let jamTerdekat = data?.semua_rute[i]?.halte[key].at(posisiIndex1)
                      keepJam.push(jamTerdekat)
                      
                      if ( halteAkhir === key && halteTanpa_ !== haltePenyambung1){ // Jika halte terakhir di suatu rute dan tidak termasuk ke halte transit penyambung, kosongin/reset
                        keep = []
                        keepJam.push(jamTerdekat)
                      }
                      
                      if (key.includes("Second") && halteTanpa_ === titikAwal  && halteAkhir !== key ){
                        
                        keep = []
                        keep.push(halteTanpa_)

                        keepJam = []
                        keepJam.push(jamTerdekat)
                      }
                      
                      if (halteTanpa_ === haltePenyambung1){ //jika halte berikut sama ada di dalam halte transit penyambung paling akhir, artinya loopingnya harus selesai
                        ruteKetigaMentah.push(keep)
                        keep = []

                        jamKetigaMentah.push(keepJam)
                        keepJam = []

                        jamTerakhirRute1Ketiga.current = jamTerdekat
                        noRuteAwalKetiga.current = i
                      }
                    }
                  }
                // if (done){break}
    
              }
              if (ruteKetigaMentah.length>0){
              let shortest = ruteKetigaMentah.reduce((acc, subarray) => subarray.length < acc.length ? subarray : acc);
                ruteAwalKetiga.current = shortest
                ruteKetigaMentah=[]
                
              let shortestJam = jamKetigaMentah.reduce((acc, subarray) => subarray.length < acc.length ? subarray : acc);
                jamAwalKetiga.current = shortestJam
                jamKetigaMentah=[]
              }

              for (let i of ruteTitikTujuan.current){
                
                let defaultState = false

                for (let key in data?.semua_rute[i]?.halte){
            
                  let keyFix = key.replace(/_Second/g, "")
                  const halteTanpa_ = keyFix.replace(/_/g, " ");
                  let halteAwal = Object.keys(data?.semua_rute[i].halte)[0].replace(/_Second/g, "")
                  let halteAkhir = Object.keys(data?.semua_rute[i].halte)[Object.keys(data?.semua_rute[i].halte).length-1].replace(/_Second/g, "")

                  if (halteTanpa_ === haltePenyambung2 || defaultState){
                      
                      defaultState = true
                      keep2.push(halteTanpa_)
                      // console.log("TEST1",keep2)
                      
                      if ( halteAkhir === key && halteAwal !== key&& halteTanpa_ !== titikTujuan){ // Jika halte terakhir di suatu rute dan tidak termasuk ke halte transit penyambung, kosongin/reset
                        keep2 = []
                      }

                      if (key.includes("Second") && halteTanpa_ === haltePenyambung2  && halteAkhir !== key ){
                        
                        keep2 = []
                        keep2.push(halteTanpa_)
                      }

                      if(halteTanpa_=== titikTujuan){
                        noRuteAkhirKetiga.current = i
                        
                        ruteKetigaMentah.push(keep2)
                        keep2= []
                      } 
                    }
                    }
              } 
              if (ruteKetigaMentah.length>0){
                
                let shortest = ruteKetigaMentah.reduce((acc, subarray) => subarray.length < acc.length ? subarray : acc);
                  ruteTujuanKetiga.current = shortest
                  ruteKetigaMentah=[]
                  setRuteDitemukan('3')
                }
          }
        }, [halteTransitDuaRute.current, halteTransitAwalMentah, titikAwal, titikTujuan]);


        useEffect(() => {

          let posisiIndex1 = ''
          let posisiIndex2 = ''
          let keepJam1 = []
          let keepJam2 = []
          let defaultState = false
          let defaultState2 = false
          
          for (let key in data?.semua_rute[noRuteTengahKetiga.current]?.halte){
            
            
            let keyFix = key.replace(/_Second/g, "")
            const halteTanpa_ = keyFix.replace(/_/g, " ");  
            
          
            if (ruteTengahFinal.current[0]===halteTanpa_ || defaultState){
              
              defaultState = true

              if(ruteTengahFinal.current[0]===halteTanpa_){ // untuk ambil index array waktu yang sesuai, satu kali aja
                setCurrentTime(new Date().toLocaleTimeString([], options))
                let jamTerdekat = data?.semua_rute[noRuteTengahKetiga.current]?.halte[key].find(jam => jam > jamTerakhirRute1Ketiga.current);
                let posisi = data?.semua_rute[noRuteTengahKetiga.current]?.halte[key].indexOf(jamTerdekat)
              
                posisiIndex1 = posisi
              }

              let jamTerdekat = data?.semua_rute[noRuteTengahKetiga.current]?.halte[key].at(posisiIndex1)
              keepJam1.push(jamTerdekat)

              if (key.includes("Second") && halteTanpa_ === ruteTengahFinal.current[0]  ){
                        
                keepJam1 = []
                keepJam1.push(jamTerdekat)
              }

              if(ruteTengahFinal.current.at(-1)===halteTanpa_){
                jamTengahKetiga.current = keepJam1
                jamTerakhirRute2Ketiga.current = jamTerdekat
                keepJam1 = []
                break;
              }

              
              
              
            }
          }

          for (let key in data?.semua_rute[noRuteAkhirKetiga.current]?.halte){
            
            let keyFix = key.replace(/_Second/g, "")
            const halteTanpa_ = keyFix.replace(/_/g, " ");
            

            if (halteTanpa_ === ruteTujuanKetiga.current[0] || defaultState2){
                console.log(halteTanpa_,"===", ruteTujuanKetiga.current[0])
                defaultState2 = true

                if(halteTanpa_ === ruteTujuanKetiga.current[0]){ // untuk ambil index array waktu yang sesuai, satu kali aja
                  setCurrentTime(new Date().toLocaleTimeString([], options))
                  let jamTerdekat = data?.semua_rute[noRuteAkhirKetiga.current]?.halte[key].find(jam => jam > jamTerakhirRute2Ketiga.current);
                  let posisi = data?.semua_rute[noRuteAkhirKetiga.current]?.halte[key].indexOf(jamTerdekat)
                
                  posisiIndex2 = posisi
                }

                let jamTerdekat = data?.semua_rute[noRuteAkhirKetiga.current]?.halte[key].at(posisiIndex2)
                keepJam2.push(jamTerdekat)

                if (key.includes("Second") && halteTanpa_ === ruteTujuanKetiga.current[0]  ){
                        
                  keepJam2 = []
                  keepJam2.push(jamTerdekat)
                }

                if(ruteTujuanKetiga.current.at(-1)===halteTanpa_){
                  jamAkhirKetiga.current = keepJam2
                  keepJam2 = []
                  break;
                }

                
              }
              }

        },[ruteTengahFinal.current, ruteTujuanKetiga.current])

        useEffect(() => {
          setRuteFinal([])
          if (ruteDitemukan==='1'){
            setRuteFinal(ruteAwalMentah.current)
            setJamFinal(jamRuteAwalMentah.current)
            setNoRuteFinal([...noRuteAwalMentah.current])
            
          } else if (ruteDitemukan==='2'){
            setRuteFinal(ruteAwalFinal.current.concat(ruteTujuanFinal))
            setJamFinal(jamRuteAwalFinal.current.concat(jamRuteTujuan.current))
            setNoRuteFinal([...noRuteAwalFinal.current]?.concat([...noRuteTujuan.current]))
            
            
            
          } else if (ruteDitemukan === '3'){
            setRuteFinal(ruteAwalKetiga.current.concat(ruteTengahFinal.current,ruteTujuanKetiga.current))
            setJamFinal(jamAwalKetiga.current.concat(jamTengahKetiga.current,jamAkhirKetiga.current))
            setNoRuteFinal([...noRuteAwalKetiga.current?.toString()]?.concat(noRuteTengahKetiga.current?.toString(),noRuteAkhirKetiga.current?.toString()))
           
        
          
          }



        }, [ruteAwalMentah.current, ruteAwalFinal.current, ruteTujuanFinal, ruteAwalKetiga.current, ruteDitemukan ]);
        
  
    if (isLoading) return 'Loading...'
  
    if (error) return 'An error has occurred: ' + error.message

    

  return (
    <awalTujuan.Provider value={{setTitikAwal,setTitikTujuan }}> 
    <div className="Search flex">
      <Flex gap="20">
        <div className="titikAwal">
          <input
            name="search"
            value={search}
            onChange={(e) => {setSearch(e.target.value);}}
            />
          {filteredData?.map((item, index) => 
            <p onClick={()=>{setTitikAwal(item)}} key={index}>{item}</p>
          )}
        </div>
        
        {/* titikAwalnya dapet, cuma perlu delay gabisa langsung diambil */}
        {/* {console.log(titikAwal,"=",ruteTitikAwal.current)} 
        {console.log(titikTujuan,"=",ruteTitikTujuan.current)} 


       
        {console.log("rute 0","=",ruteAwalMentah.current)} 
        {console.log("rute 1 JADI","=",ruteAwalFinal.current)} 
        {console.log("rute 1 back","=",ruteTujuanMentah.current)} 
        {console.log("halte transit","=",halteTransitAwalMentah)} 
        {console.log("halte transit back","=",halteTransitTujuanMentah)} 
        {console.log("transit Match","=",halteTransitDuaRute.current)} 
        {console.log("Rute 2 JADI","=",ruteTujuanFinal)} 
        {console.log("====================")} 
        {console.log("Rute Transit Tengah","=",ruteTengahMentah.current)} 
        {console.log("Rute Gabungan","=",halteTransitTengahMentah)} 
        {console.log("rute Final Tengah","=",ruteTengahFinal.current)} 
        {console.log("ruteAwalKetiga","=",ruteAwalKetiga.current)} 
        {console.log("ruteTujuanKetiga","=",ruteTujuanKetiga.current)} 
        {console.log("ruteFinal","=",ruteFinal)} 
        {console.log("JAM 0","=",jamRuteAwalMentah.current)} 
        {console.log("JAM 1 JADI","=",jamRuteAwalFinal.current)} 
        {console.log("JAM TERAKHIR","=",jamTerakhirRute1.current)} 
        {console.log("JAM 2","=",jamRuteTujuan.current)} 
        {console.log("JAM TERAKHIR 3.1","=",jamTerakhirRute1Ketiga.current)} 
        {console.log("JAM TERAKHIR 3.2","=",jamTerakhirRute2Ketiga.current)} 
        {console.log("JAM Awal Ketiga","=",jamAwalKetiga.current)} 
        {console.log("JAM Tengah Ketiga","=",jamTengahKetiga.current)} 
        {console.log("JAM Akhir Ketiga","=",jamAkhirKetiga.current)}  */}
        {/* {console.log("JAM FINAL","=",jamFinal)} 
        {console.log("====================================")}  */}

        {console.log(ruteFinal)}

        <div className="tujuan">
          <input
            name="search"
            value={search}
            onChange={(e) => {setSearch(e.target.value);}}
            />
          {filteredData?.map((item, index) => 
            <p onClick={()=>{setTitikTujuan(item)}} key={index}>{item}</p>
          )}
        </div>

        <p>{titikAwal}</p>
        <h1>Render Count: {count.current}</h1>
        <p>{titikTujuan}</p>
      
      </Flex>

      

    </div>
    </awalTujuan.Provider>
  );
}







