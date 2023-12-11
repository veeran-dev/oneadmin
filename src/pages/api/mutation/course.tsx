import { useMutation, gql } from '@apollo/client';

export const CREATE_COURSE = gql`
mutation CreateCourse($input: CourseInput!, $images: [Upload!] = []) {
    createCourse(input: $input, images: $images) {
      instituteId
      category
      name
      images
      description
      duration
      features {
        title
        detail
      }
    }
  }  
`;

export const GET_COURSE = gql`
  query GetCourseById($query: getCourseID!) {
    getCourseById(query: $query) {
      _id
      instituteId
      category
      name
      images
      description
      duration
      features {
        title
        detail
      }
    }
  }
`;


export const GET_COURSES_BY_INSTITUTE_ID = gql`
  query GetCourseByInstituteId($query: getInstituteID!) {
    getCourseByInstituteId(query: $query) {
      _id
      instituteId
      category
      name
      images
      description
      duration
      features {
        title
        detail
      }
    }
  }
`;

// editCourse(courseId: String!, courseData: CourseInput!, images: [Upload!]!): Course!

export const EDIT_COURSE = gql`
  mutation EditCourse($courseId: String!, $courseData: CourseInput!, $images: [Upload!]!) {
    editCourse(courseId: $courseId, courseData: $courseData, images: $images) {
      _id
      instituteId
      category
      name
      images
      description
      duration
      features {
        title
        detail
      }
    }
  }
`;