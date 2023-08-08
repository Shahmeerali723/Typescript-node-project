import chalkAnimation from "chalk-animation";
const sleep = (ms = 2000) => new Promise((resolve) => {
    setTimeout(resolve, ms);
});
const welcome = async (param) => {
    const welcomeScreen = chalkAnimation.rainbow(param);
    await sleep();
    welcomeScreen.stop();
};
export default welcome;
