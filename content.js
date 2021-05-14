(function () {
    "use strict";

    // 右側のコンテンツ表示のiframeエレメントを取得
    var iframeElement = document.getElementsByName('OPERATION')[0];

    // iframe内の遷移を検知
    iframeElement.onload = function () {
        // 画面タイプを取得
        var iframeDocument = iframeElement.contentWindow.document;
        var registForm = iframeDocument.getElementsByName('FORM_COMMON')[0];
        var gamenType = registForm.querySelector('input[name="SASFWNEXTLABEL"]');

        // 勤休内容登録画面（WC020）の場合、登録ボタンにEventListenerを埋め込み
        if (gamenType.value == 'WC020') {
            var registButton = registForm.getElementsByTagName('center')[0].getElementsByTagName('table')[2].getElementsByTagName('td')[2].getElementsByTagName('a')[1];
            registButton.addEventListener("click", kaisuKomokuCheck, false);
        }

        // 回数項目の入力チェック
        function kaisuKomokuCheck() {
            var holidayDivision = iframeDocument.getElementsByName('HolidayDivision')[0];
            var allowanceItem = iframeDocument.getElementsByName('AllowanceItem')[0];
            var allowanceItemValue = iframeDocument.getElementsByName('AllowanceItemValue')[0];

            // 出勤（休暇区分が空）または振替（休暇区分が振替）の場合
            if (holidayDivision.value == 'Holiday_1_Company_4' || holidayDivision.value == 'Holiday_39') {
                // 勤務種別が空の場合
                if (!allowanceItem.value || !allowanceItemValue.value) {
                    alert('回項数目に未入力があります。入力して再登録してください。');
                // 回数が1以外の場合
                } else if (allowanceItemValue.value != 1) {
                    alert('回数項目が 1 ではありません。1 を入力して再登録してください。');
                }
            // 休暇（休暇区分が空または振替以外）の場合               
            } else {
                // 勤務種別が入力されている場合
                if (allowanceItem.value) {
                    alert('回数項目が入力されています。空にして再登録してください。');
                }
            }
        };
    };
})();