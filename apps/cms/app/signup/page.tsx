"use client"
import SignupForm from '@/app/component/SignupForm';

function handleClick(){
console.log("On back clicked")
}


export default function SignUp(){
    return <SignupForm onBack={handleClick}/>

}