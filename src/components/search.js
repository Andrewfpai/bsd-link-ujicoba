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

    const [rute0, setRute0] = useState([])
    const [halteTransit1, setHalteTransit1] = useState([])
    // const halteTransit1B = useRef([])
    const [rute1Back, setRute1Back] = useState([])
    const [halteTransitBack, setHalteTransitBack] = useState([])
    const halteTransitDuaRute = useRef([])

    
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
          
          setRute0([]) 
          setHalteTransit1([]) // selalu reset ketika titik awal dan tujuan berubah
   
          setRute1Back([]) 
          setHalteTransitBack([]) 
      
          let done = false;
          let done2 = false;
          
          for (let i of ruteTitikAwal.current) {

            let defaultState = false;
            
            for (let key in data?.semua_rute[i]?.halte) { 
              
              let keyFix = key.replace(/_Second/g, "")
              
              const halteTanpa_ = keyFix.replace(/_/g, " ");
              console.log(halteTanpa_)
             
              if ((halteTanpa_=== titikAwal && titikTujuan) || defaultState){ //Kalo belum sesuai titik awal jangan dibuat rutenya dulu, tapi kalo udah lewat boleh, mencegah kebuat rute yang berbalik arus
                
                defaultState = true
              
                setRute0(rute0 => [...rute0, halteTanpa_]);
                
                if ((Object.keys(data?.semua_rute[i].halte)[Object.keys(data?.semua_rute[i].halte).length-1] === keyFix && Object.keys(data?.semua_rute[i].halte)[Object.keys(data?.semua_rute[i].halte).length-1] !== titikTujuan.replace(/ /g, "_") )){
                  
                  setRute0([])
                }


                if(halteTanpa_ === titikTujuan && rute0){
                 
                  
                  done = true
                  // setRute1Back([]);
                  // setHalteTransitBack([]);
                  setHalteTransit1([]);
            

                  break;
                }
                if (data?.halte_transit.includes(halteTanpa_)){ //jika ada halte yang termasuk di dalam array halte transit, masukkin ke array
                  
                  
                  setHalteTransit1(halteTransit1 => [...halteTransit1, halteTanpa_+" "+i]);
         
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
                setRute1Back([])
                setHalteTransitBack([])
                break
              }
              
              setRute1Back(rute1Back => [...rute1Back, halteTanpa_])

              

              if ((halteTanpa_=== titikTujuan && key !== Object.keys(data?.semua_rute[i].halte)[0]) ){ //jika sudah ketemu tujuan, tapi tujuan itu bukan halte pertama suatu rute, misal tujuan halte sektor 1.3
                done2 = true
                break;
      
              }
              

              if (data?.halte_transit.includes(halteTanpa_)){ //jika ada halte yang termasuk di dalam array halte transit, masukkin ke array
                
                setHalteTransitBack(halteTransitBack => [...halteTransitBack, halteTanpa_+" "+i]);
              
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

          halteTransit1.forEach(halte=>{
            let reformatTransit = halte.slice(0, -2)
            halteTransit1B.push(reformatTransit)
          })

          let done = false
          // const halteTransit2 = {}

          for (let halte of halteTransitBack){
          
            let reformatTransit = halte.slice(0, -2) //PERBAIKAN 
            
            if (halteTransit1B.includes(reformatTransit)){
              
              halteTransitDuaRute.current.push(reformatTransit)
              // setHalteTransitMatch(halteTransitDuaRute => [...halteTransitDuaRute, reformatTransit])
              let defaultState = false
              let ruteTujuan = halte.charAt(halte.length-1) // ambil halte transitnya ada di rute mana, hasilnya 0,1,2
              
            }
            
          }
        }, [halteTransit1, halteTransitBack]);
        

        useEffect(() => {
         
          setruteAwalFinal([])
          setruteTujuanFinal([])

          let done = false
          let done2 = false
          let done3 = false

           for (let halte of halteTransit1){
            
            let defaultState = false
            let ruteAwal1 = halte.charAt(halte.length-1)
            
            let halteAkhir = Object.keys(data?.semua_rute[ruteAwal1].halte)[Object.keys(data?.semua_rute[ruteAwal1].halte).length-1]
           
            for (let key in data?.semua_rute[ruteAwal1]?.halte) { 
                
                if (key.includes("Second")){
                    key.replace("_Second", "")
                  }
                const halteTanpa_ = key.replace(/_/g, " ");
                
                
                if ((halteTanpa_=== titikAwal) || defaultState){ //Kalo belum sesuai titik awal jangan dibuat rutenya dulu, tapi kalo udah lewat boleh, mencegah kebuat rute yang berbalik arus
                  
                  defaultState = true

                  setruteAwalFinal(rute1 => [...rute1, halteTanpa_])
                  
                  if ( halteAkhir === key && !halteTransitDuaRute.current.includes(halteTanpa_)){ // Jika halte terakhir di suatu rute dan tidak termasuk ke halte transit penyambung, kosongin/reset
                    setruteAwalFinal([])
                  }
                  if (halteTransitDuaRute.current.at(-1) === halteTanpa_){ //jika halte berikut sama ada di dalam halte transit penyambung paling akhir, artinya loopingnya harus selesai
                    done = true
                    break;
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



          for (let halte of halteTransitBack){
          
            let defaultState = false
            let ruteBack1 = halte.charAt(halte.length-1)
 
           
              for (let key in data?.semua_rute[ruteBack1]?.halte) { 
                  
                let keyFix = key.replace(/_Second/g, "")
                const halteTanpa_ = keyFix.replace(/_/g, " ");
                
                
                if (halteTransitDuaRute.current.at(-1) === halteTanpa_ || defaultState){
                  defaultState = true
                  setruteTujuanFinal(ruteTujuanFinal => [...ruteTujuanFinal, halteTanpa_])

                  if(halteTanpa_=== titikTujuan && ruteTujuanFinal){
                    console.log("TES")
                    // setruteTujuanFinal(ruteTujuanFinal => [...ruteTujuanFinal, "---"]);
                    done2 = true
                    break;
                  } 
                }


                

                
              }
            if (done2){break}

          }

        }, [halteTransit1, halteTransitBack]);

        
  
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


       
        {console.log("rute 0","=",rute0)} 
        {console.log("rute 1 JADI","=",ruteAwalFinal)} 
        {console.log("rute 1 back","=",rute1Back)} 
        {console.log("halte transit","=",halteTransit1)} 
        {console.log("halte transit back","=",halteTransitBack)} 
        {console.log("transit Match","=",halteTransitDuaRute.current)} 
        {console.log("Rute 2 JADI","=",ruteTujuanFinal)} 
        {/* {console.log("halte transit 2","=",halteTransit2)} 
        {console.log("halte transit 3","=",halteTransit3)} 
        {console.log("Rute Lalu","=",halteLalu)}  */}
        {console.log("====================")} 

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







