import Avatar from "@mui/joy/Avatar/Avatar";

const Login = (props) => {
    return (
        <div id="login_page" class="bg-gray-400 h-[500px] min-w-[340px] rounded-3xl mt-24 z-0 ml-80 absolute">
            <div className="intro">
                <p class="text-white text-xl text-center pt-8 font-semibold">Welcome Back!</p>
                <p class="text-white text-sm text-center mt-1">Login to continue</p>
                <div class="pt-6 flex justify-center"><Avatar/></div>
                <p class="text-white pt-2 text-center">Login</p>
            </div>
            <div className="entryFields" class="text-center">
                <form>
                    <input type="text" name="username" placeholder="Username" class="bg-gray-300 placeholder:text-slate-500 placeholder:text-center rounded-md mt-8 p-[1px] w-60"></input><br/>
                    <input type="password" name="pasword" placeholder="Password" class="bg-gray-300 placeholder:text-slate-500 placeholder:text-center rounded-md mt-4 p-[1px] w-60"></input><br/>
                    <input type="password" name="confirm_pasword" placeholder="Confirm Password" class="bg-gray-300 placeholder:text-slate-500 placeholder:text-center rounded-md mt-4 p-[1px] w-60"></input><br/>
                    <button class="mt-8 bg-lime-500 w-60 p-1 rounded-md font-semibold">Login</button>
                </form>
            </div>
            <div>
                <p class="text-white text-center pr-2 mt-8 ml-8">If you haven't signed up already, then <button class="bg-gray-500 hover:bg-gray-300 rounded-md" name="signup_page" onClick={props.manageUser}>signup</button></p>
            </div>
        </div>
    );
}

export default Login;