# Quelque function

Lire une video et la mettre en pause, en mode AR

    _onPlayVideo(){

        // var videoPausedState = this.state.videoPaused;
        // var reText;

        // if (videoPausedState == true) {
        //     reText = 'play';
        //     videoPausedState = false;
        // }else{
        //     reText = 'pause';
        //     videoPausedState = true;
        // }

        this.setState({
            // text : reText,
            videoPaused : !this.state.videoPaused
        });
    }