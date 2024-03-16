// import React from 'react'
import { useParams } from "react-router-dom";
// import { Progress } from "@/components/ui/progress";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import 'react-vertical-timeline-component/style.min.css';
// import { useState } from "react";

export default function CoursePage() {
  // const [progress, setProgress] = useState(0);
  const { courseID } = useParams();
  return (
    <div className="flex h-screen w-full">
      <div className="h-full w-full flex flex-col">
        <div className="intro h-2/5 bg-blue-400"></div>
        <div className="cont relative h-3/5 overflow-hidden flex w-full">
          <div className="syllabus flex flex-col basis-1/2 overflow-scroll p-2">
            <div className="text-purple-700 font-bold text-[25px]">Syllabus</div>
            <div className="silly overflow-hidden flex h-full w-full">
              <div className="-rotate-90 flex h-full w-full">
                <div className="content h-full"></div>
              </div>
              <div></div>
            </div>
          </div>
          <div className="timeline basis-1/2 overflow-scroll p-2">
            <div className="text-purple-700 font-bold text-[25px]">TimeLine</div>
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
