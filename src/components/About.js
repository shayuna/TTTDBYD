import React from "react";
import Button from "./button";

const About = (props)=>(
    <div className="aboutPg main">
        <div className="itm">
            <div style={myStyles.prg}>
            The end always waits. we go on running through our days in order not to encounter this
            terrifying thought. and when we think about it, in the rare moments that we dare to look
            at it, the thing that frightens, me at least, more than everything else is the thought
            that i will be sorry for things that i could have done but didn't.
            the irony in that, i think, that on my deadbed i will propbalby think about things
            that there and then will be impossible, but right here and now are at an arm's reach.
            now i have my health, my senses, my emphaty and joy for living , so as to make everything
            possible. and by everything i don't mean flying a jet or petthing a white shark on its fin.
            i mean doing the things we can easily do right now but will greatly regret if we'll dismiss.
            because of the (false) feeling that we have all the time in the world to make them happen.
            for me, it's growing a moustache, shoplifting (occasionally and only from welloff places) and stop watching porn.
            you may have noticed that we're talking here mostly about processes and not a one time deed.
            </div>
            <div style={myStyles.prg}>
            So, what is it for you ? here you have a real chance to think about the things you'll like 
            to do, share them with others and receive feedback and also add new dreams 
            to your list. 
            </div>
            <div style={{...myStyles.prg,...myStyles.noIndent}}>
            p.s. if you have any feedback you can write to me at <a href="mailto:shaiz2206@gmail.com">shaiz2206@gmail.com</a>
            </div>
        </div>
        <div className="homeBtnWrapper"><Button caption="Back" activateProperFunctionBoy={props.switchToMain}/></div>
    </div>
);
const myStyles = {
    prg:{
        margin:"0.5rem 0",
        textIndent:"1rem",
    },
    noIndent:{
        textIndent:"0",
    }
}
const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default About;

