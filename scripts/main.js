// TimeControl - v8/build 158 compatibility patch
// Keeps the original idea, but removes brittle UI/color calls and reapplies the delta provider on world load.

let tcSpeedExp = 0;
let tcSlider = null;
let tcLabel = null;

function tcSpeedText(exp){
    if(exp >= 0){
        return "x" + Math.pow(2, exp);
    }
    return "x1/" + Math.pow(2, Math.abs(exp));
}

function tcApplySpeed(exp){
    tcSpeedExp = exp;
    let speed = Math.pow(2, exp);

    // This hook still exists in v8; server code itself uses Time.setDeltaProvider.
    Time.setDeltaProvider(() => Math.min(Core.graphics.getDeltaTime() * 60 * speed, 3 * speed));

    if(tcLabel != null) tcLabel.setText(tcSpeedText(exp));
    if(tcSlider != null && tcSlider.getValue() != exp) tcSlider.setValue(exp);
}

function tcVisible(){
    // Hide when there is no active game. This is safer than relying only on hudfrag internals.
    try{
        if(!Vars.state.isGame()) return false;
    }catch(e){
        return false;
    }

    // Not useful as a normal multiplayer client; the host/server owns simulation time.
    try{
        if(Vars.net.client()) return false;
    }catch(e){}

    try{
        if(Vars.ui.minimapfrag.shown()) return false;
    }catch(e){}

    try{
        if(!Vars.ui.hudfrag.shown) return false;
    }catch(e){}

    return true;
}

function tcBuildUI(root){
    root.table(Tex.pane, t => {
        tcLabel = t.label(() => tcSpeedText(tcSpeedExp)).growX().width(84).get();

        let reset = t.button(new TextureRegionDrawable(Icon.refresh), 24, () => tcApplySpeed(0)).padLeft(6).get();
        reset.getStyle().imageUpColor = Pal.accent;

        tcSlider = new Slider(-8, 8, 1, false);
        tcSlider.setValue(tcSpeedExp);
        tcSlider.moved(v => tcApplySpeed(v));
        t.add(tcSlider).padLeft(6).minWidth(220);
    });

    root.visibility = () => tcVisible();
}

if(!Vars.headless){
    Events.on(ClientLoadEvent, () => {
        let root = new Table();
        root.bottom().left();
        tcBuildUI(root);
        Vars.ui.hudGroup.addChild(root);

        if(Vars.mobile) root.moveBy(0, Scl.scl(46));
        tcApplySpeed(0);
    });

    Events.on(WorldLoadEvent, () => tcApplySpeed(tcSpeedExp));
}
