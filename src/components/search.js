import {useState, useEffect, useRef} from 'react'
import { useQuery } from '@tanstack/react-query'
import useDebounce from '../hooks/useDebounce'
import { Flex, Spacer } from '@chakra-ui/react'

export default function Search(){

  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const debouncedSearchTerm = useDebounce(search, 1000)
  const count = useRef(0);
  
    const [titikAwal, setTitikAwal] = useState('')
    const [titikTujuan, setTitikTujuan] = useState('')

    // const [ruteAwal, setRuteAwal] = useState([])
    const ruteTitikAwal = useRef([])
    const ruteTitikTujuan = useRef([])

    const [ruteAwalMentah, setRuteAwalMentah] = useState([])
    const [halteTransitAwalMentah, setHalteTransitAwalMentah] = useState([])
   
    const [ruteTujuanMentah, setRuteTujuanMentah] = useState([])
    const [halteTransitTujuanMentah, setHalteTransitTujuanMentah] = useState([])

    const ruteTengahMentah = useRef([])
    const ruteTengahFinal = useRef([])
  
    const [halteTransitTengahMentah, setHalteTransitTengahMentah] = useState([])

    const halteTransitDuaRute = useRef([])
    
    const testRuteTersedia = useRef([])
    
    const [ruteAwalFinal, setruteAwalFinal] = useState([]) //Rute 1 Final
    const [ruteTujuanFinal, setruteTujuanFinal] = useState([]) // Rute 2 Final

    const ruteFinal = useRef([])

    
   

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

        // untuk filter search bar
        useEffect(() => {
          const filtered = data?.nama_halte?.filter(item => {
            if (debouncedSearchTerm === '') {
              return item;
            } else {
          
              return item?.toLowerCase()?.includes(debouncedSearchTerm.toLowerCase());
            }
          });
   
          setFilteredData(filtered || []);
        }, [data, debouncedSearchTerm]);
        

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
                console.log("YESSSSSS===========================")
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
          
          setRuteAwalMentah([]) 
          setHalteTransitAwalMentah([]) // selalu reset ketika titik awal dan tujuan berubah
   
          setRuteTujuanMentah([]) 
          setHalteTransitTujuanMentah([]) 
      
          let done = false;
          let done2 = false;
          
          for (let i of ruteTitikAwal.current) {

            let defaultState = false;
            
            for (let key in data?.semua_rute[i]?.halte) { 
              
              let keyFix = key.replace(/_Second/g, "")
              let halteAkhir = Object.keys(data?.semua_rute[i].halte)[Object.keys(data?.semua_rute[i].halte).length-1].replace(/_Second/g, "")
              
              const halteTanpa_ = keyFix.replace(/_/g, " ");
              
             
              if ((halteTanpa_=== titikAwal && titikTujuan) || defaultState){ //Kalo belum sesuai titik awal jangan dibuat rutenya dulu, tapi kalo udah lewat boleh, mencegah kebuat rute yang berbalik arus
                
                defaultState = true

                if (key.includes("Second") && titikAwal === halteTanpa_){
                    setRuteAwalMentah([])
                    
                  }
               
                setRuteAwalMentah(ruteAwalMentah => [...ruteAwalMentah, halteTanpa_]);
                
                
                if ((Object.keys(data?.semua_rute[i].halte)[Object.keys(data?.semua_rute[i].halte).length-1] === key && halteAkhir !== titikTujuan.replace(/ /g, "_") )){
                  setRuteAwalMentah([])
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
                  // setRuteTujuanMentah([]);
                  // setHalteTransitTujuanMentah([]);
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
                setRuteTujuanMentah([])
                setHalteTransitTujuanMentah([])
                break
              }
              
              setRuteTujuanMentah(ruteTujuanMentah => [...ruteTujuanMentah, halteTanpa_])

              

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
         
          setruteAwalFinal([])
          setruteTujuanFinal([])

          let done = false
          let done2 = false
          let done3 = false

           for (let halte of halteTransitAwalMentah){
            
            let defaultState = false
            let ruteAwal1 = halte.charAt(halte.length-1)
            
            let halteAkhir = Object.keys(data?.semua_rute[ruteAwal1].halte)[Object.keys(data?.semua_rute[ruteAwal1].halte).length-1]
           
            for (let key in data?.semua_rute[ruteAwal1]?.halte) { 
                
                let keyFix = key.replace(/_Second/g, "")
                const halteTanpa_ = keyFix.replace(/_/g, " ");
                
                
                if ((halteTanpa_=== titikAwal) || defaultState){ //Kalo belum sesuai titik awal jangan dibuat rutenya dulu, tapi kalo udah lewat boleh, mencegah kebuat rute yang berbalik arus
                 
                  defaultState = true

                  setruteAwalFinal(rute1 => [...rute1, halteTanpa_])
                  
                  if ( halteAkhir === key && !halteTransitDuaRute.current.includes(halteTanpa_)){ // Jika halte terakhir di suatu rute dan tidak termasuk ke halte transit penyambung, kosongin/reset
                    console.log(halteTanpa_)
                    setruteAwalFinal([])
                  }
                  if (halteTransitDuaRute.current.at(-1) === halteTanpa_){ //jika halte berikut sama ada di dalam halte transit penyambung paling akhir, artinya loopingnya harus selesai
                    done = true
                    break;
                  }
                  
                  if (key.includes("Second") && halteAkhir !== key){
                    setruteAwalFinal([])
                    setruteAwalFinal(rute1 => [...rute1, halteTanpa_])
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
 
           
              for (let key in data?.semua_rute[ruteBack1]?.halte) { 
                  
                let keyFix = key.replace(/_Second/g, "")
                const halteTanpa_ = keyFix.replace(/_/g, " ");
                
                
                if (halteTransitDuaRute.current.at(-1) === halteTanpa_ || defaultState){
                  defaultState = true
                  setruteTujuanFinal(ruteTujuanFinal => [...ruteTujuanFinal, halteTanpa_])

                  if(halteTanpa_=== titikTujuan && ruteTujuanFinal){
                  
                    // setruteTujuanFinal(ruteTujuanFinal => [...ruteTujuanFinal, "---"]);
                    done2 = true
                    break;
                  } 
                }


                

                
              }
            if (done2){break}

          }

        }, [halteTransitAwalMentah, halteTransitTujuanMentah]);





        useEffect(() => {
          let ruteGabungan = ruteTitikAwal.current.concat(ruteTitikTujuan.current)
          let done = false
          let halteTransitAwalReformat = []
          let halteTransitTujuanReformat = []
          

          ruteTengahMentah.current = []
          ruteTengahFinal.current = []
          // console.log("COBA",halteTransitDuaRute.current)


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
                    
                    // console.log("MASUK2")
                    
                    ruteTengahMentah.current.push(halteTanpa_)
                    defaultState = true

                    if(halteTransitTujuanReformat.includes(halteTanpa_)){
                      
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

          }
        }, [halteTransitDuaRute.current, halteTransitAwalMentah]);

        // if ((halteTanpa_=== titikAwal && titikTujuan) || defaultState){ //Kalo belum sesuai titik awal jangan dibuat rutenya dulu, tapi kalo udah lewat boleh, mencegah kebuat rute yang berbalik arus
                
        //   defaultState = true

        //   if (key.includes("Second") && titikAwal === halteTanpa_){
        //       setRuteAwalMentah([])
              
        //     }
         
        //   setRuteAwalMentah(ruteAwalMentah => [...ruteAwalMentah, halteTanpa_]);
          
          
        //   if ((Object.keys(data?.semua_rute[i].halte)[Object.keys(data?.semua_rute[i].halte).length-1] === key && halteAkhir !== titikTujuan.replace(/ /g, "_") )){
        //     setRuteAwalMentah([])
        //   }


        //   if(halteTanpa_ === titikTujuan && ruteAwalMentah){
        //     done = true
       
        //     setHalteTransitAwalMentah([]);

        //     break;
        //   }
          

        //   if (data?.halte_transit.includes(halteTanpa_)){ //jika ada halte yang termasuk di dalam array halte transit, masukkin ke array
            
            
        //     setHalteTransitAwalMentah(halteTransitAwalMentah => [...halteTransitAwalMentah, halteTanpa_+" "+i]);
   
        //   }
        // }



        
  
    if (isLoading) return 'Loading...'
  
    if (error) return 'An error has occurred: ' + error.message

    

  return (
    <div className="Search">
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
        {console.log(titikAwal,"=",ruteTitikAwal.current)} 
        {console.log(titikTujuan,"=",ruteTitikTujuan.current)} 


       
        {console.log("rute 0","=",ruteAwalMentah)} 
        {console.log("rute 1 JADI","=",ruteAwalFinal)} 
        {console.log("rute 1 back","=",ruteTujuanMentah)} 
        {console.log("halte transit","=",halteTransitAwalMentah)} 
        {console.log("halte transit back","=",halteTransitTujuanMentah)} 
        {console.log("transit Match","=",halteTransitDuaRute.current)} 
        {console.log("Rute 2 JADI","=",ruteTujuanFinal)} 
        {console.log("====================")} 
        {console.log("Rute Transit Tengah","=",ruteTengahMentah.current)} 
        {console.log("Rute Gabungan","=",halteTransitTengahMentah)} 
        {console.log("rute Final Tengah","=",ruteTengahFinal.current)} 
        {/* {console.log("halte transit 2","=",halteTransit2)} 
        {console.log("halte transit 3","=",halteTransit3)} 
        {console.log("Rute Lalu","=",halteLalu)}  */}
        {console.log("====================================")} 

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
  );
}







