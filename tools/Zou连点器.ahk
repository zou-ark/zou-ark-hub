#Requires AutoHotkey v2.0
#SingleInstance Force
Persistent

; Zou走走 · VX：Hiizou
; 仅在单机、测试环境或服务器规则允许时使用。

global running := false
global leftOn := false
global rightOn := false
global cOn := false
global leftInterval := 80
global rightInterval := 120
global cInterval := 180
global holdMs := 300
global hotkeys := Map("toggle", "F6", "left", "F7", "right", "F8", "c", "F9", "stop", "F12")
global statusText

app := Gui("+AlwaysOnTop", "Zou 连点器 · Zou走走")
app.SetFont("s10", "Microsoft YaHei UI")
app.BackColor := "F1F3EB"
app.AddText("xm w480 c174A3C", "Zou 连点器")
app.AddText("xm y+2 w480 c6B7C71", "Zou走走 · VX：Hiizou    |    鼠标与键盘辅助工具")
app.AddText("xm y+15 w480 c88552F", "请仅在单机、测试环境或服务器规则允许时使用。F12 可立即停止全部动作。")

app.AddText("xm y+18 w130", "左键连点间隔 (ms)")
leftEdit := app.AddEdit("x+8 yp-3 w90", leftInterval)
app.AddText("x+25 yp+3 w125", "右键连点间隔 (ms)")
rightEdit := app.AddEdit("x+8 yp-3 w90", rightInterval)

app.AddText("xm y+14 w130", "C 键连点间隔 (ms)")
cEdit := app.AddEdit("x+8 yp-3 w90", cInterval)
app.AddText("x+25 yp+3 w125", "长按时长 (ms)")
holdEdit := app.AddEdit("x+8 yp-3 w90", holdMs)

leftCheck := app.AddCheckbox("xm y+18 w150", "启用左键连点")
rightCheck := app.AddCheckbox("x+15 yp w150", "启用右键连点")
cCheck := app.AddCheckbox("x+15 yp w150", "启用 C 键连点")

app.AddText("xm y+18 w480 c174A3C", "快捷键（可修改后点击应用）")
app.AddText("xm y+8 w55", "启动")
toggleEdit := app.AddEdit("x+4 yp-3 w55", "F6")
app.AddText("x+15 yp+3 w55", "左键")
leftHotEdit := app.AddEdit("x+4 yp-3 w55", "F7")
app.AddText("x+15 yp+3 w55", "右键")
rightHotEdit := app.AddEdit("x+4 yp-3 w55", "F8")
app.AddText("x+15 yp+3 w55", "C键")
cHotEdit := app.AddEdit("x+4 yp-3 w55", "F9")
app.AddText("x+15 yp+3 w55", "停止")
stopHotEdit := app.AddEdit("x+4 yp-3 w55", "F12")

applyBtn := app.AddButton("xm y+15 w150", "应用快捷键")
startBtn := app.AddButton("x+12 w150", "启动 / 暂停 (F6)")
stopBtn := app.AddButton("x+12 w150", "全部停止 (F12)")
statusText := app.AddText("xm y+15 w480 c55715F", "状态：待机")
app.AddText("xm y+15 w480 c6B7C71", "提示：左右键长按可用鼠标按下后持续 hold ms，再按对应停止键释放。")

leftCheck.OnEvent("Click", (*) => UpdateFlags())
rightCheck.OnEvent("Click", (*) => UpdateFlags())
cCheck.OnEvent("Click", (*) => UpdateFlags())
applyBtn.OnEvent("Click", (*) => ApplyHotkeys())
startBtn.OnEvent("Click", (*) => ToggleRun())
stopBtn.OnEvent("Click", (*) => StopAll())
app.OnEvent("Close", (*) => ExitApp())
app.Show()
ApplyHotkeys()

UpdateFlags() {
    global leftCheck, rightCheck, cCheck, leftOn, rightOn, cOn
    leftOn := leftCheck.Value = 1
    rightOn := rightCheck.Value = 1
    cOn := cCheck.Value = 1
}

ApplyHotkeys() {
    global hotkeys, toggleEdit, leftHotEdit, rightHotEdit, cHotEdit, stopHotEdit
    for keyName, keyValue in hotkeys {
        try Hotkey(keyValue, "Off")
    }
    hotkeys["toggle"] := StrUpper(Trim(toggleEdit.Value))
    hotkeys["left"] := StrUpper(Trim(leftHotEdit.Value))
    hotkeys["right"] := StrUpper(Trim(rightHotEdit.Value))
    hotkeys["c"] := StrUpper(Trim(cHotEdit.Value))
    hotkeys["stop"] := StrUpper(Trim(stopHotEdit.Value))
    Hotkey(hotkeys["toggle"], ToggleRun, "On")
    Hotkey(hotkeys["left"], ToggleLeft, "On")
    Hotkey(hotkeys["right"], ToggleRight, "On")
    Hotkey(hotkeys["c"], ToggleC, "On")
    Hotkey(hotkeys["stop"], StopAll, "On")
    SetStatus("快捷键已应用")
}

ToggleRun(*) {
    global running
    running := !running
    if running {
        UpdateFlags()
        SetTimer(LeftTick, leftOn ? ReadNumber(leftEdit, 80) : 0)
        SetTimer(RightTick, rightOn ? ReadNumber(rightEdit, 120) : 0)
        SetTimer(CTick, cOn ? ReadNumber(cEdit, 180) : 0)
        SetStatus("运行中 · F12 立即停止")
    } else {
        SetTimer(LeftTick, 0), SetTimer(RightTick, 0), SetTimer(CTick, 0)
        SetStatus("已暂停")
    }
}

ToggleLeft(*) => ToggleTimer("left")
ToggleRight(*) => ToggleTimer("right")
ToggleC(*) => ToggleTimer("c")

ToggleTimer(kind) {
    global running, leftOn, rightOn, cOn, leftEdit, rightEdit, cEdit
    if !running
        running := true
    if kind = "left" {
        leftOn := !leftOn
        SetTimer(LeftTick, leftOn ? ReadNumber(leftEdit, 80) : 0)
    } else if kind = "right" {
        rightOn := !rightOn
        SetTimer(RightTick, rightOn ? ReadNumber(rightEdit, 120) : 0)
    } else {
        cOn := !cOn
        SetTimer(CTick, cOn ? ReadNumber(cEdit, 180) : 0)
    }
    SetStatus("运行中 · 已切换 " kind "")
}

LeftTick() {
    global running, leftOn
    if running && leftOn
        Click()
}
RightTick() {
    global running, rightOn
    if running && rightOn
        Click("Right")
}
CTick() {
    global running, cOn
    if running && cOn
        SendEvent("c")
}

StopAll(*) {
    global running, leftOn, rightOn, cOn
    running := false, leftOn := false, rightOn := false, cOn := false
    SetTimer(LeftTick, 0), SetTimer(RightTick, 0), SetTimer(CTick, 0)
    Click("Up"), Click("Right Up")
    SetStatus("已全部停止")
}

ReadNumber(control, fallback) {
    value := Integer(control.Value)
    return value > 10 ? value : fallback
}

SetStatus(text) {
    global statusText
    statusText.Text := "状态：" text
}
