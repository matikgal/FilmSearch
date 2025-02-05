import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchActorDetails } from "../Services/ApiService"

export default function ActorPage(){
    const {actorID} = useParams<{actorID: string}>()
    const actorId = Number(actorID)

    interface ActorDeatails {
        id: number
        name: string
        biography: string
        gender: number 
        birthday: string
        deathday: string
        img: string
        place_of_birth: string
        webpage: string
    }


    const [actorDetails,setActorDetails] = useState<ActorDeatails | null>()
    useEffect(() => {
        async function fetchData(){
            const actorData = await fetchActorDetails(actorId)

            setActorDetails(actorData)
        }
        fetchData()
    },[])
    console.log(actorDetails)
    
    if (!actorDetails) {
        return <p>Ładowanie danych aktora...</p>; 
    }
    

        return (
            <div>
                <div className="flex flex-col max-w-1/2 text-white pl-6 gap-y-4">
                    
                    <div className=" bg-center bg-no-repeat w-64 h-96 mx-auto mt-4 rounded-2xl" style={{ backgroundImage: `url(${actorDetails.img})` }}></div>
                    <h1 className="text-white text-3xl p-4 mx-auto">{actorDetails.name}</h1>
                    <p className="text-white ">{actorDetails.biography}</p>
                    <h2 className="text-2xl " >Płeć: {actorDetails.gender == 1 ? 'kobieta':
                                                    actorDetails.gender == 2 ? 'Mężczyżna':
                                                    actorDetails.gender == 3 ? 'Non-binary':
                                                    "brak danych"
                        }</h2>
                    <h2 className="text-2xl">Data urodzin: {actorDetails.birthday} </h2>
                    <h2 className="text-2xl">{actorDetails.deathday == null ? '':
                        "Data śmierci"} {actorDetails.deathday}</h2>
                    <h2 className="text-2xl">Miejsce urodzenia: {actorDetails.place_of_birth}</h2>
                    <h2 className="text-2xl">{actorDetails.webpage == null ? '':
                        "strona: "}{actorDetails.webpage} </h2>
                </div>
            </div>
            );
    }
