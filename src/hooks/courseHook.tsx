import { CREATE_COURSE, GET_COURSE, GET_COURSES_BY_INSTITUTE_ID, EDIT_COURSE } from '@/pages/api/mutation/course';
import { useMutation, useQuery } from '@apollo/client';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/router';
import { use, useEffect } from 'react';

interface CourseInput {
    instituteId: string;
    category: string;
    images: string[];
    name: string;
    description: string;
    duration: number;
    features: [{title: string, detail: string}];
  }
  
  interface CourseType {
    instituteId: string;
    category: string;
    name: string;
    images: string[];
    description: string;
    duration: number;
    features: string[];
  }
  

const useCreateCourse = () => {
  const [createCourseMutation, { loading, error, data }] = useMutation(CREATE_COURSE);
  const {user} = useUser();

  const createCourse = async (
    input: CourseInput,
    images: any,
    onComplete?: (data: CourseType) => void,
    onError?: (error: Error) => void
  ) => {
    try {
        input['instituteId'] = user?.instituteId || ""
        const fileListArray = Array.from(images);

        const response = await createCourseMutation({
            variables: { input, images:fileListArray },
        });

        if (onComplete && response.data) {
            onComplete(response.data.createCourse);
        }


    } catch (error:any) {
      console.log("error is ......",error)
      if (onError) {
        onError(error);
      }
    }
  };

  return { createCourse, loading, error, data };
};

const useEditCourse = () => {
  const [editCourseMutation, { loading:editLoading, error:editError, data:course }] = useMutation(EDIT_COURSE);
  const {user} = useUser();
  const router = useRouter()
  const {id} = router.query

  const editCourse = async (
    courseData: CourseInput,
    images: any,
    onComplete?: (data: CourseType) => void,
    onError?: (error: Error) => void
  ) => {
    
    try {
        courseData['instituteId'] = user?.instituteId || ""
        const fileListArray = Array.from(images);
        const response = await editCourseMutation({
            variables: { courseId:id, courseData, images:fileListArray },
        });

        if (onComplete && response.data) {
            onComplete(response.data.editCourse);
        }


    } catch (error:any) {
      console.log("error is course ......",error)
      if (onError) {
        onError(error);
      }
    }
  };

  return { editCourse, editLoading, editError, course };
};


const useGetCourse = () => {

  const router = useRouter();
  const { id } = router.query;
  
  const { loading, error, data } = useQuery(GET_COURSE, {
    variables: {
      query: {
          courseId: id,
      },
  },
  });

  if (id === "new" || !id) {
    return { loading: false, error: [], course: undefined };
  }

  return {
    loading,
    error,
    course: data ? data.getCourseById : null,
  };
};


const useGetCoursesByInstituteId = (name="") => {
  const router = useRouter();
  const instituteId = useUser()?.user?.instituteId;
  const { loading, error, data,refetch } = useQuery(GET_COURSES_BY_INSTITUTE_ID, {
    variables: { query: { instituteId,name:name } },
  });

  useEffect(() => {
    refetch();
  },[router.pathname])
  

  return {
    loading,
    error,
    courses: data ? data.getCourseByInstituteId : [],
  };
};



export {useCreateCourse, useGetCourse, useGetCoursesByInstituteId, useEditCourse};
