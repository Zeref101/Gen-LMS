// import React from 'react'
import { fetchCourse } from "@/lib/backend/User";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { Progress } from "@/components/ui/progress";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
// import { useState } from "react";

// interface course {
//   course_code: string;

//   course_id: string;

//   course_intro: string;

//   image_url: string;

//   name: string;
// }

export default function CoursePage() {
  // const [progress, setProgress] = useState(0);
  const { courseID } = useParams();
  console.log(courseID);
  const [data, setData] = useState<DocumentData>();
  useEffect(() => {
    async function fetch() {
      if (courseID) {
        setData(await fetchCourse(courseID));
        console.log(data, "data");
      }
    }
    fetch();
  }, []);
  return (
    <div className="flex h-screen w-full">
      <div className="h-full w-full flex flex-col">
        <div style={{
                          background: "linear-gradient(90deg, rgba(52,42,204,1) 0%, rgba(68,68,218,1) 40%, rgba(0,212,255,1) 100%)",
                        }} className="intro h-2/5 text-white flex justify-center gap-10 items-center">
          {data && <div className="h-full py-20 w-1/3"><img className="h-full w-full" src={data[0].image_url} alt="" /></div>}
          <div className="flex w-3/4 h-full flex-col justify-center items-start gap-10">
            {data && <div className="font-extrabold text-6xl">{data[0].name}</div>}
            {data && <div className="font-semibold text-2xl">{data[0].course_intro}</div>}
          </div>
        </div>
        <div className="cont relative h-3/5 overflow-hidden flex w-full">
          {/* <div className="syllabus flex flex-col basis-1/2 overflow-scroll p-2">
            <div className="text-purple-700 font-bold text-[25px]">
              Syllabus
            </div>
            <div className="silly overflow-hidden flex h-full w-full">
              <div className="-rotate-90 flex h-full w-full">
                <div className="content h-full"></div>
              </div>
              <div></div>
            </div>
          </div> */}
          <div className="timeline w-full h-full overflow-scroll p-2">
            <div className="text-purple-700 font-bold text-[25px]">
              Course TimeLine
            </div>
            <VerticalTimeline>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date="2011 - present"
                dateClassName="mx-4"
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              >
                <h3 className="vertical-timeline-element-title">
                  Art Director
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  San Francisco, CA
                </h4>
                <p>
                  Creative Direction, User Experience, Visual Design, SEO,
                  Online Marketing
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date="2010 - 2011"
                dateClassName="mx-4"
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              >
                <h3 className="vertical-timeline-element-title">
                  Art Director
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  San Francisco, CA
                </h4>
                <p>
                  Creative Direction, User Experience, Visual Design, SEO,
                  Online Marketing
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date="2008 - 2010"
                dateClassName="mx-4"
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              >
                <h3 className="vertical-timeline-element-title">
                  Web Designer
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  Los Angeles, CA
                </h4>
                <p>User Experience, Visual Design</p>
              </VerticalTimelineElement>
            </VerticalTimeline>
          </div>
        </div>
      </div>
    </div>
  );
}
