"use client";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import LoadingSkeleton from "@/app/component/LoadingSkeleton";
import NoProblems from "@/app/component/ui/NoProblem";
import { useRouter } from 'next/navigation'
import { Problem } from "@prisma/client";
import { useSocket } from "@/app/hook/useSocket";
import axios, { AxiosError } from "axios";



const difficultyColor: Record<string, string> = {
  Easy: "text-green-400",
  Medium: "text-yellow-400",
  Hard: "text-red-400",
};

const companies = [
  "Amazon",
  "Google",
  "Meta",
  "Microsoft",
  "Goldman Sachs",
  "Uber",
  "Bloomberg",
];

export default function Problems() {


  const [status, setStatus] = useState("Solved");
  const [problemList, setProblemList] = useState<Problem[]>([]);
  const [allProblemList, setAllProblemList] = useState<Problem[]>([]);
  const [topics, setTopics] = useState<string[]>([""]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    [],
  );
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  const router = useRouter();


  useEffect(() => {
  

      const getProblems = async () => {
      setLoading(true);
      try{
        const { data } = await api.get("/problems");
      if(data?.length===0){
        setError(true);
      }
      setProblemList(data); // this state will be used to update the data and apply the filter logics
      setAllProblemList(data); // this will be set up for first time and no further mutated
      const topic = [...new Set(data.flatMap((d:Problem) => d.topic))] as string[];
      setTopics(topic);
      }catch(error){
        if(axios.isAxiosError(error)){
          const serverMessage = error.response?.data?.message || error.response?.data?.error
          console.log("Axios Error message:", serverMessage || error.message)
        }else{
          console.log("unexpected error",error)
        }
      }finally{
        setLoading(false)
      }
    }
    getProblems();  
    
  }, []);

  const applyFilters = (
    difficulties: string[],
    topic: string[],
  ) => {
    let filtered = allProblemList;

    // Difficulty Filter
    if (difficulties.length > 0) {
      filtered = filtered.filter((problem) =>
        difficulties.includes(problem.difficulty),
      );
    }

    // Topic Filter
    if (topic.length>0) {
      filtered = filtered.filter((problems)=>{
       return topic.includes(problems.topic)
      })
    }

    setProblemList(filtered);
  };

    const onTopicChange = (topic: string) => {
    let updatedTopic: string[];

    if (selectedTopics.includes(topic)) {
      updatedTopic = selectedTopics.filter((t) => t !== topic);
    } else {
      updatedTopic = [...selectedTopics, topic];
    }
    setSelectedTopics(updatedTopic);
    applyFilters(selectedDifficulties, updatedTopic);
  };

  const onDifficultyChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    difficulty: string,
  ) => {
    let updatedDifficluty: string[];

    if (e.target.checked) {
      updatedDifficluty = [...selectedDifficulties, difficulty];
    } else {
      updatedDifficluty = selectedDifficulties.filter((d) => d !== difficulty);
    }

    setSelectedDifficulties(updatedDifficluty);

    applyFilters(updatedDifficluty, selectedTopics);
  };

  const handleCompanies = (
    e: React.ChangeEvent<HTMLInputElement>,
    company: string,
  ) => {
    // Navigate the page to company url
  };

  const problemDescriptionHandler = async(e:React.MouseEvent<HTMLTableRowElement> ,problem:Problem) =>{
      router.push(`/problems/${problem?.slug}/description`)
  }

  {
    return loading ? <LoadingSkeleton/> :  <div className="min-h-screen bg-[#1a1a1a] text-white flex gap-4 px-6 py-6">
      {/* Sidebar */}
      <div className="w-[200px] shrink-0 flex flex-col gap-4">
        <div className="bg-[#222222] border border-white/10 rounded-xl p-4">
          <h2 className="text-xs uppercase text-white/40 font-semibold mb-3">
            Progress
          </h2>
          <div className="flex flex-col gap-2">
            {["Easy", "Medium", "Hard"].map((d) => (
              <div
                key={d}
                className="flex items-center justify-between text-sm"
              >
                <span className={difficultyColor[d]}>{d}</span>
                <span className="text-white/30 text-xs">0/{allProblemList.filter((problem)=> problem.difficulty === d).length}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#222222] border border-white/10 rounded-xl p-4">
          <h2 className="text-xs uppercase text-white/40 font-semibold mb-3">
            Topics
          </h2>
          <div className="flex flex-col gap-1.5">
            {topics.map((topic: string) => (
              <button
                key={topic}
                onClick={() => onTopicChange(topic)}
              className={`text-left text-xs px-2 py-1.5 rounded-md transition-all duration-200 cursor-pointer
          ${
            selectedTopics.includes(topic)
              ? "bg-[#ffa116]/20 text-[#ffa116] border border-[#ffa116]/40"
              : "text-white/50 hover:text-white hover:bg-white/5"
          }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Problem List */}
      <div className="flex-1">
         {
                error ?<NoProblems/> :<><div className="bg-[#222222] border border-white/10 rounded-xl overflow-hidden">
           
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          
           
          
            <h1 className="text-sm font-semibold">All Problems</h1>
            <span className="text-xs text-white/30">
              {problemList.length} problems
            </span>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-white/40 uppercase text-xs">
              <tr>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Title</th>
                <th className="px-5 py-3 text-left">Topic</th>
                <th className="px-5 py-3 text-left">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {problemList.map((p) => (
                <tr
                 onClick={(e) => problemDescriptionHandler(e, p)}
                  key={p.id}
                  className="border-t border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <td className="px-5 py-3.5">
                    {/* {p.solved ? (
                      <span className="text-green-400 text-xs">✓</span>
                    ) : (
                      <span className="w-3 h-3 rounded-full border border-white/20 inline-block" />
                    )} */} solved
                  </td>
                  <td className="px-5 py-3.5 font-medium hover:text-[#ffa116] transition-colors">
                    {p.title}
                  </td>
                  <td className="px-5 py-3.5 text-white/40 text-xs">
                    {p.topic}
                  </td>
                  <td
                    className={`px-5 py-3.5 text-xs font-medium ${difficultyColor[p.difficulty]}`}
                  >
                    {p.difficulty}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
            }
        
      </div>

      {/* Filter Section */}
      <div className="w-[220px] shrink-0 flex flex-col gap-4">
        <div className="bg-[#222222] border border-white/10 rounded-xl p-4">
          <h2 className="text-xs uppercase text-white/40 font-semibold mb-3">
            Difficulty
          </h2>
          <div className="flex flex-col gap-1.5">
            {["Easy", "Medium", "Hard"].map((d) => (
              <label
                key={d}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  onChange={(e) => onDifficultyChange(e, d)}
                  type="checkbox"
                  className="accent-[#ffa116] w-3 h-3"
                />
                <span className={`text-xs ${difficultyColor[d]}`}>{d}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-[#222222] border border-white/10 rounded-xl p-4">
          <h2 className="text-xs uppercase text-white/40 font-semibold mb-3">
            Companies
          </h2>
          <div className="flex flex-col gap-1.5">
            {companies.map((c) => (
              <label key={c} className="flex items-center gap-2 cursor-pointer">
                <input
                  onChange={(e) => handleCompanies(e, c)}
                  type="checkbox"
                  className="accent-[#ffa116] w-3 h-3"
                />
                <span className="text-xs text-white/50 hover:text-white transition-colors">
                  {c}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-[#222222] border border-white/10 rounded-xl p-4">
          <h2 className="text-xs uppercase text-white/40 font-semibold mb-3">
            Status
          </h2>
          <div className="flex flex-col gap-1.5">
            {["All", "Solved", "Unsolved"].map((s) => (
              <label key={s} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  className="accent-[#ffa116] w-3 h-3"
                />
                <span className="text-xs text-white/50 hover:text-white transition-colors">
                  {s}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  }

}
