import { PhotoIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import SuccessAnimation from '@/components/common/SuccessAnimation';
import Header from '@/components/common/header';
import {useCreateCourse, useEditCourse, useGetCourse} from '@/hooks/courseHook';
// import courseCategories from './courseCategory';
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';



export default function Course() {

    const { createCourse, loading, error, data } = useCreateCourse();
    const { editCourse, editLoading, editError, course:course2 } = useEditCourse();
    const {  loading:courseLoading, error:courseError, course } = useGetCourse();
    const [successMessage, setSuccessMessage] = useState<string>("")
    const configs ={
        options: false,
        link: undefined
    }
    const { register, handleSubmit, control, setValue, getValues,formState: { errors } } = useForm({
        mode: "onBlur",
        defaultValues: {
            name: "",
            category: "",
            description: "",
            duration: "",
            features: [{ title: "", detail: "" }],
            image: [],
          },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'features'
    });
    const router = useRouter()

    const validateOptions = (index: number) => ({
        name: { required: "Name is required" },
        duration: { required: "duration is required" },
        image: { required: "image is required" },
        category: { required: "category is required" },
        description: { required: "About is required" },
        features: {
            title: {
            validate: (value: string) => {
                let detail = getValues(`features.${index}.detail`)
                if (value.trim() === "" && detail.trim() !== "") {
                return "Both Feature Title and Detail is required";
                }
                return true;
            },
            },
            detail: {
            validate: (value: string) => {
            
                let title = getValues(`features.${index}.title`)
                if (value.trim() === "" && title.trim() !== "") {
                    return "Both Feature Title and Detail is required";
                }
                return true;
            },
            },
        },
    });

    useEffect(()=>{
        if(course){
            let features = course.features.length>0 ? course.features : [{ title: "", detail: "" }]
            setValue("name", course.name);
            setValue("category", course.category);
            setValue("description", course.description);
            setValue("duration", course.duration);
            setValue("features", features);
            setValue("image", course.images || []);
        }
    },[course])
      


    const handleRegistration = async(formData:any)=>{
        const { id } = router.query
        try {

            let featureData = formData.features.map((feature: { [x: string]: any; __typename: any; }) => {
                // Create a new object without __typename
                const { __typename, ...featureWithoutTypename } = feature;
                return featureWithoutTypename;
            });
            
            
            const fileInput = document.getElementById('file-upload') as HTMLInputElement;
            const selectedFiles = fileInput?.files;
            const input = {
              instituteId: "",
              category: formData.category,
              images: [], // Assuming image is an array of strings
              name: formData.name,
              description: formData.description,
              duration: formData.duration,
              features: formData.features[0].title !== "" ? featureData:[{title:"", detail:""}],
            };
            if(id && id !== "new"){
                await editCourse(
                    input,
                    selectedFiles,
                    (data) => {
                      setSuccessMessage("Course edited successfully");
                      setTimeout(()=>{
                          router.push("/course")
                      },2000)
                      
                    },
                    (error) => {
                      toast.error("Error editing course");
                      setTimeout(()=>{
                          router.push("/course")
                      },2000)
                    }
                );
            }
            else{
                await createCourse(
                    input,
                    fileInput.files,
                    (data) => {
                      setSuccessMessage("Course created successfully");
                      setTimeout(()=>{
                          router.push("/course")
                      },2000)
                      
                    },
                    (error) => {
                      toast.error("Error creating course");
                      setTimeout(()=>{
                          router.push("/course")
                      },2000)
                    }
                );

            }
      
            
          } catch (error) {
            console.error("Error in handleRegistration:", error);
            toast.error("Error in handleRegistration");
          }
    }
    
    const handleError=(error:any)=>{
        console.log("handleError",error)
    }

    if(successMessage !== ""){
        return <div className='h-[calc(100vh-64px)]'>
            <SuccessAnimation message={successMessage}/>
        </div> 
    }


  return (
    <div className='px-8 py-4'>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
        <Header title={"Create Course"} config={configs}/>
        <div className="p-8 bg-clip-border rounded-xl bg-white border border-blue-gray-100 shadow-sm">
            <form onSubmit={handleSubmit(handleRegistration, handleError)}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Create New Course</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        This information will be displayed on the website
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Course Name<span className='text-red-600'>*</span>
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                    type="text"
                                    id="name"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    {...register('name', validateOptions(0).name) }
                                />
                                </div>
                                <small className="text-red-700">
                                    {errors?.name && errors.name.message}
                                </small>
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                Category<span className='text-red-600'>*</span>
                            </label>
                            <div className="mt-2">
                                <select
                                id="category"
                                autoComplete="category-name"
                                className="block w-full rounded-md border-0 py-1.5 px-2 h-[35px] bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                {...register('category', validateOptions(0).category) }
                                >
                                <option value="">Select a category</option>
                                {courseCategories.map(course=><option key={course} value={course}>{course}</option>)}
                                </select>
                            </div>
                            <small className="text-red-700">
                            {errors?.category && errors.category.message}
                        </small>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                About Course <span className='text-red-600'>*</span>
                            </label>
                            <div className="mt-2">
                                <textarea
                                id="description"
                                rows={3}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                {...register('description', validateOptions(0).description) }
                                />
                            </div>
                            <small className="text-red-700">
                                {errors?.description && errors.description.message}
                            </small>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                Cover photo
                            </label>
                            <small className="text-red-700">
                                {errors?.image && errors.image.message}
                            </small>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                    <span>Upload a file</span>
                                    <input 
                                        id="file-upload" 
                                        type="file" 
                                        className="sr-only"
                                        {...register('image') }
                                    />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="duration" className="block text-sm font-medium leading-6 text-gray-900">
                                Course Duration<span className='text-red-600'>*</span>
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                    type="text"
                                    id="duration"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    {...register('duration', validateOptions(0).duration) }
                                />
                                </div>
                                <div>
                                <small className="text-gray-500">
                                    (ex: 2 months, 7 days)
                                </small>
                                </div>
                                <small className="text-red-700">
                                    {errors?.duration && errors.duration.message}
                                </small>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="duration" className="block text-sm font-medium leading-6 text-gray-900">
                                Course Features
                            </label>
                            {fields.map((field:any, index:any) => (
                                <div key={"field"+{index}} className=' mb-2 bg-gray-50 px-4 py-2 rounded-lg'>
                                    <div className='flex justify-end '>

                                            <button type="button" className='w-[24px] h-[24px] rounded-lg text-gray-500 hover:text-gray-300' onClick={() => fields.length > 1 && remove(index)}>
                                                <MinusCircleIcon className='text-md' />
                                            </button>
                                            <button type="button" className='w-[24px] h-[24px] rounded-lg text-gray-500 hover:text-gray-300' onClick={() => append(index)}>
                                                <PlusCircleIcon className='text-md' />
                                            </button>
                                    </div>
                                    <div key={field.id} >
                                        <div className='mb-4'>
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                {'Title'}
                                            </label>
                                            <input
                                                placeholder='Ex: Certification' 
                                                className="mt-2 block w-full rounded-md border-0 pl-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                {...register(`features.${index}.title`, validateOptions(0).features.title)} 
                                                defaultValue={field.name} 
                                            />
                                            {errors.features?.[index]?.title && (
                                                <small className=" mt-4 text-red-500">
                                                    {errors?.features[index]?.title?.message}
                                                </small>
                                            )}
                                        </div>
                                        <div className='mb-4'>
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                {'Detail'}
                                            </label>
                                            <input
                                                placeholder='Ex: On Completion' 
                                                className="mt-2 block w-full rounded-md border-0 pl-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                {...register(`features.${index}.detail`, validateOptions(0).features.detail)} 
                                                defaultValue={field.detail} 
                                            />
                                            {errors.features?.[index]?.detail && (
                                                <small className=" mt-4 text-red-500">
                                                    {errors?.features[index]?.detail?.message}
                                                </small>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                Cancel
                </button>
                <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                Save
                </button>
            </div>
            </form>
        </div>
    </div>
  )
}


const courseCategories = [
    'Dance',
    'Music',
    'Chess',
    'Karate',
    'Art',
    'Cooking',
    'Yoga',
    'Programming',
    'Photography',
    'Languages',
    'Mathematics',
    'Science',
    'Writing',
    'Gardening',
    'Fitness',
    'Meditation',
    'History',
    'Literature',
    'Design',
    'Finance',
    'Business',
    'Technology',
    'Crafts',
    'Robotics',
    'Theater',
    'Sports',
    'Astrology',
    'Psychology',
    'Environmental Studies',
    'Philosophy',
    'DIY Projects',
    'Culinary Arts',
    'Fashion Design',
    'Graphic Design',
    'Marketing',
    'Animation',
    'Film Production',
    'Architecture',
  ];

  
