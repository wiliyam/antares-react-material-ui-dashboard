import React from 'react';

import Loader from 'react-loader-spinner'

export default function LoaderCom(props) {


    return (
        <div style={{
            height: "100%", width: "100%", position: 'sticky', display: 'flex', justifyContent: 'center', alignContent: "center", margin: "auto", 'justify-content': "center", top: 0
        }}>
            <Loader
                type="ThreeDots"
                color="#080808"
                height={100}
                width={100}
                //   timeout={3000} //3 secs
                visible={props.visible}

            />
        </div >
    );
}
