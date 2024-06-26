//是否登入
//採買清單內的食譜數量、每個食譜的詳細資訊
//收藏的食譜內的食譜數量、每個食譜的詳細資訊
//編輯後的食譜的食譜數量、每個食譜的詳細資訊
//總共有幾個客製化收藏夾、名字分別是甚麼
//每個客製化資料夾的數量和每個的詳細資訊、每個食譜的詳細資訊
//客製化資料夾每個的詳細資訊:每個資料夾客製化的id
//每個食譜的詳細資訊:食譜圖片、食譜名字、食譜按讚數、食譜瀏覽數、食譜創建日期
$(document).ready(function(){

    var checklogin = 0;
    $(".loginsignbtn").empty();
    if(checklogin==0){
        $(".loginsignbtn").append(`<div class="sign" style="margin:auto;">LogOut</div>`)
    }else{
        $(".loginsignbtn").append(`<div class="login">Login</div>
                                    <div class="sign">Sign up</div>`)
    }
    // 新增一個客製化資料夾------------------------------------------------------------------------------------------
    var idcount = 0;
    var selectedRadioId;
    $('#label-confirm-button').on("click",function(){
        for(var i=0;i<1;i++){
            idcount++;
            var clonedelement = $("#draggable").clone();
            clonedelement.attr("id", `draggable-${idcount}`);
            clonedelement.find("input").attr("id", `radio-customize-${idcount}`);
            clonedelement.find("label").attr("for",`radio-customize-${idcount}`);
            clonedelement.find("label").find(".container-left-buy").text(`${$("#new-file-name").val()}`);
            clonedelement.find("label").find(".container-left-buy").prepend(`<i class="fa-regular fa-pen-to-square" style="margin-left: 7%;margin-right: 5px;"></i>`);
            $(".add-label").css("display","none");
            clonedelement.droppable({
                drop: function( event, ui ) {
                    var isnotreceipebook=$(ui.draggable).attr("class")=="hotreceipebookmark col-xl-2 gx-0 ui-sortable-helper";
                    if(isnotreceipebook==true){
                        console.log(`選取到的物件為bookmark`);
                        $(this).find("p").removeClass("turn-green");
                            const radioButtons = document.querySelectorAll('input[name="radio-bookmark"]');
                            const radioGroup = Array.from(radioButtons);
                            console.log(radioGroup);
                            console.log(`選取到的資料夾id為${radioGroup[radiocount].id}`);
                            var dropthefolder=0;
                            for(var i=0;i<array2D.length;i++){
                                console.log(`${$(this).find("input").prop("id")} == ${array2D[i][0]} i=${i}`);
                                if($(this).find("input").prop("id") == array2D[i][0]){
                                    dropthefolder=i;
                                    console.log(`dropthefolder=${dropthefolder}`);
                                    break;
                                }
                            }
                                console.log(`我要把第${radiocount+1}個收藏夾裡第${$(ui.draggable).prop("id")}個食譜(食譜id為${array2D[radiocount][$(ui.draggable).prop("id")]})放進第${dropthefolder+1}資料夾`);
                                array2D[dropthefolder].push(array2D[radiocount][$(ui.draggable).prop("id")]);
                        // console.log($(this));
                    }
                }
                ,over:function( event, ui ) {
                    var isnotreceipebook=$(ui.draggable).attr("class")=="hotreceipebookmark col-xl-2 gx-0 ui-sortable-helper";
                    if(isnotreceipebook==true){
                        $(this).find("p").addClass("turn-green");
                    }
                }
                ,out:function( event, ui ) {
                    var isnotreceipebook=$(ui.draggable).attr("class")=="hotreceipebookmark col-xl-2 gx-0 ui-sortable-helper";
                    if(isnotreceipebook==true){
                        $(this).find("p").removeClass("turn-green");
                    }
                }
                }
            );
            $("#customize-sample").append(clonedelement);
            console.log($(".container-left").css("height"));
            var height = parseInt($(".container-left").css("height")) + 40;
            $(".container-left").css("height",height);
            array2D.push([clonedelement.find("input").prop("id")]);
        }
    });
    // 新增一個客製化收藏夾彈出的取名頁面(顯示)------------------------------------------------------------------------------------------
    $("#add-more-bookmark").on("click",function(){
        $(".add-label").css("display","block");
    })
    // 新增一個客製化收藏夾彈出的取名頁面(消失)------------------------------------------------------------------------------------------
    $("#label-deny-button").on("click",function(){
        $(".add-label").css("display","none");
    })
    // 客製化收藏夾的排版移動------------------------------------------------------------------------------------------
    $( function() {
        $( "#customize-sample" ).sortable({ revert: "invalid" });
      } );
    // 客製化收藏夾內的排版移動------------------------------------------------------------------------------------------
    $( function() {
        $( "#receipe-collection" ).sortable({ revert: "invalid" });
      } );
    // 客製化收藏夾放進垃圾桶的操作------------------------------------------------------------------------------------------
    $( "#trash-bin" ).droppable({
        drop: function( event, ui ) {
            $(ui.draggable).remove();
            array2D.splice(radiocount,1);
            var height = parseInt($(".container-left").css("height")) - 40;
            $(".container-left").css("height",height);
        }
        ,over:function( event, ui ) {
            console.log(ui.draggable);
            $(ui.draggable).find("p").addClass("turn-red");
        }
        ,out:function( event, ui ) {
            console.log(ui.draggable);
            $(ui.draggable).find("p").removeClass("turn-red");
        }
        }
    );
    $( "#radio-edit-id" ).droppable({
        drop: function( event, ui ) {
            alert("導向到編輯食譜頁面");
            $(this).find("p").removeClass("turn-yellow");
        }
        ,over:function( event, ui ) {
            console.log(ui.draggable);
            $(this).find("p").addClass("turn-yellow");
        }
        ,out:function( event, ui ) {
            console.log(ui.draggable);
            $(this).find("p").removeClass("turn-yellow");
        }
        }
    );
    $( "#radio-buy-id" ).droppable({
        drop: function( event, ui ) {
            $(this).find("p").removeClass("turn-yellow");
        }
        ,over:function( event, ui ) {
            console.log(ui.draggable);
            $(this).find("p").addClass("turn-yellow");
        }
        ,out:function( event, ui ) {
            console.log(ui.draggable);
            $(this).find("p").removeClass("turn-yellow");
        }
        }
    );
    // 頁面說明欄的部分---------------------------------------------------------------------------------------------------------------------------
    var selectedRadioId = "radio-buy";
    var morelabel = 0;
    $("#more-label").on("click",function(){
        console.log(selectedRadioId);
        if(morelabel==0){
            if(selectedRadioId == "radio-buy")
                $(".container-header").after(`<div class="more-information-label"><div class="label-title">採買清單</div><div class="label-information">這個頁面專門用來管理你在食譜中需要購買的所有食材。你可以根據不同的食譜生成採買清單，並隨時更新或刪除不需要的食材。這樣可以方便你在購物時確保沒有遺漏任何必要的食材。</div></div>`);
            else if(selectedRadioId == "radio-favorite")
                $(".container-header").after(`<div class="more-information-label"><div class="label-title">收藏的食譜</div><div class="label-information">這個頁面是你所有喜愛食譜的集中地。你可以將你喜歡的食譜收藏起來，方便未來的查看和使用。這裡的食譜可以包括任何你感興趣的菜餚，不論是家常菜還是高級料理。</div></div>`);
            else if(selectedRadioId == "radio-edit")
                $(".container-header").after(`<div class="more-information-label"><div class="label-title">編輯後的食譜</div><div class="label-information">這個頁面用來管理你對現有食譜進行的所有修改。無論是調整食材份量、改變烹飪步驟，還是添加個人備註，你可以在這裡保存和查看所有編輯過的食譜。</div></div>`);
            else
            $(".container-header").after(`<div class="more-information-label"><div class="label-title">客製化食譜資料夾</div><div class="label-information">這個頁面專門用來管理你個性化定制的食譜收藏夾。你可以根據不同的分類和需求創建多個收藏夾，將食譜按主題或使用頻率進行整理和管理，讓你能夠更快捷地找到所需的食譜。</div></div>`);
            morelabel=1;
        }else{
            $(document).find(".more-information-label").remove();
            console.log("%");
            morelabel=0;
        }
    })
    // 左邊選取到的資料夾是哪一個(採買清單、收藏食譜...)------------------------------------------------------------------------------------------
    $(document).on('change', 'input[type="radio"][name="radio-bookmark"]', function() {
        var selectedRadioName = $('input[name="radio-bookmark"]:checked').next().find("p").text();
        selectedRadioId = $('input[name="radio-bookmark"]:checked').prop("id");
        $(document).find(".more-information-label").remove();
        morelabel=0;
        $("#select-menu").text(selectedRadioName);
    });
    // 從example-pages匯入各個資料夾有甚麼食譜-------------------------------------------------------------------------------------------------------------------------------
    fetchData();
    const recipeDetailsMap = new Map();    
    async function fetchData(){
        try {
            const pageResponse = await fetch('../json/example-pages.json');
            const pageData = await pageResponse.json();
            var pages;
            Object.keys(pageData).forEach(pageKey => {
                const page = pageData[pageKey];
                console.log(`pageKey=${pageKey}`);
                console.log(`page.name=${page.name}`);
                console.log(`page.receipeCount=${page.recipeCount}`);
                if(pageKey>2){
                    array2D.push([page.name]);
                }
                for(var i=0;i<page.recipeCount;i++){
                    const ids = page.recipes[i].id;
                    array2D[pageKey].push(ids);
                    // console.log(ids);
                }
            }
        );
        console.log(array2D);
        addcustomizeFetch();
        }catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    // 從json把製作的食譜收藏夾數據顯示愛畫面上-------------------------------------------------------------------------------------------------------------------------------
    function addcustomizeFetch(){
        console.log(`array2D.length=${array2D.length}`);
        for(var i=3;i<array2D.length;i++){
            idcount++;
            var clonedelement = $("#draggable").clone();
            clonedelement.attr("id", `draggable-${idcount}`);
            clonedelement.find("input").attr("id", `radio-customize-${idcount}`);
            clonedelement.find("label").attr("for",`radio-customize-${idcount}`);
            clonedelement.find("label").find(".container-left-buy").text(`${array2D[i][0]}`);
            array2D[i][0]=`radio-customize-${idcount}`;
            clonedelement.find("label").find(".container-left-buy").prepend(`<i class="fa-regular fa-pen-to-square" style="margin-left: 7%;margin-right: 5px;"></i>`);
            $(".add-label").css("display","none");
            clonedelement.droppable({
                drop: function( event, ui ) {
                    var isnotreceipebook=$(ui.draggable).attr("class")=="hotreceipebookmark col-xl-2 gx-0 ui-sortable-helper";
                    if(isnotreceipebook==true){
                        console.log(`選取到的物件為bookmark`);
                        $(this).find("p").removeClass("turn-green");
                            const radioButtons = document.querySelectorAll('input[name="radio-bookmark"]');
                            const radioGroup = Array.from(radioButtons);
                            console.log(radioGroup);
                            console.log(`選取到的資料夾id為${radioGroup[radiocount].id}`);
                            var dropthefolder=0;
                            for(var i=0;i<array2D.length;i++){
                                console.log(`${$(this).find("input").prop("id")} == ${array2D[i][0]} i=${i}`);
                                if($(this).find("input").prop("id") == array2D[i][0]){
                                    dropthefolder=i;
                                    console.log(`dropthefolder=${dropthefolder}`);
                                    break;
                                }
                            }
                                console.log(`我要把第${radiocount+1}個收藏夾裡第${$(ui.draggable).prop("id")}個食譜(食譜id為${array2D[radiocount][$(ui.draggable).prop("id")]})放進第${dropthefolder+1}資料夾`);
                                array2D[dropthefolder].push(array2D[radiocount][$(ui.draggable).prop("id")]);
                        // console.log($(this));
                        // alert(`已把${$()}放進${$()}資料夾`);
                    }
                }
                ,over:function( event, ui ) {
                    var isnotreceipebook=$(ui.draggable).attr("class")=="hotreceipebookmark col-xl-2 gx-0 ui-sortable-helper";
                    if(isnotreceipebook==true){
                        $(this).find("p").addClass("turn-green");
                    }
                }
                ,out:function( event, ui ) {
                    var isnotreceipebook=$(ui.draggable).attr("class")=="hotreceipebookmark col-xl-2 gx-0 ui-sortable-helper";
                    if(isnotreceipebook==true){
                        $(this).find("p").removeClass("turn-green");
                    }
                }
                }
            );
            $("#customize-sample").append(clonedelement);
            console.log($(".container-left").css("height"));
            var height = parseInt($(".container-left").css("height")) + 40;
            $(".container-left").css("height",height);
        }
    }
    // 根據radio選擇的資料夾顯示在右邊欄位內-------------------------------------------------------------------------------------------------------------------------------
    let array2D = new Array(3).fill(null).map(() => []);
    array2D = [["radio-favorite"],["radio-buy"],["radio-edit"]];
    var radiocount = 0;
    $(document).on('change', 'input[type="radio"][name="radio-bookmark"]', function() {
        for(var i=0;i<array2D.length;i++){
            for(var j=0;j<array2D[i].length;j++){
                if(array2D[i][j]=="null"){
                    array2D[i].splice(j,1);
                }
            }    
        }
        $(".hot_receipe_space").empty();
        const radios = document.querySelectorAll('input[type="radio"][name="radio-bookmark"]');
        radios.forEach((radio, index) => {
                if (radio.checked) {
                    radiocount = index;
                }
        });

        const radioButtons = document.querySelectorAll('input[name="radio-bookmark"]');
        const radioGroup = Array.from(radioButtons);
        console.log(radioGroup);
        console.log(`選取到的id為${radioGroup[radiocount].id}`);

        for(var i=0;i<radioGroup.length;i++){
            console.log(`${radioGroup[radiocount].id} == ${array2D[i][0]}`);
            if(radioGroup[radiocount].id==array2D[i][0]){
                radiocount=i;
                break;
            }
        }
        // 從example-receipe.json載入各食譜的相關資訊並匯入到各個recipebookmark-------------------------------------------------------------------------------------------------------------------------------
        console.log(`點擊到第${radiocount+1}個收藏夾，收藏夾裡有的食譜id為${array2D[radiocount]}`);
        console.log(`第${radiocount+1}收藏夾有${array2D[radiocount].length-1}個食譜`);

        fetchRecipeDetails();

        async function fetchRecipeDetails(){
            try {
                const response = await fetch('../json/example-receipe.json');
                const data = await response.json();
                function getRecipeById(id) {
                    return data.recipes.find(recipe => recipe.id === id);
                }
                for(var i =1;i<array2D[radiocount].length;i++){
                    console.log(`第${radiocount+1}個收藏夾的第${i}個元素id為${array2D[radiocount][i]}的食譜`);
                        $("#receipe-collection").append(`
                                        <!-- ----------------------------------------------------------- -->
                                        <div class="hotreceipebookmark col-xl-2 gx-0" id="${i}">
                                            <div class="hotreceipe-img" style="background-image:url(../img/${getRecipeById(array2D[radiocount][i]).image})"></div>
                                            <div class="hotreceipe-information row gx-0">
                                                <ul class="hot-receipe-data row gx-0">
                                                    <li class="col-3 gx-0"><i class="fa-regular fa-eye"></i>${getRecipeById(array2D[radiocount][i]).views}</li>
                                                    <li class="col-3 gx-0"><i class="fa-regular fa-thumbs-up"></i>${getRecipeById(array2D[radiocount][i]).followers}</li>
                                                </ul>
                                            </div>
                                            <div class="hotreceipe-introduction">${getRecipeById(array2D[radiocount][i]).name}</div>
                                        </div>
                                        <!-- ----------------------------------------------------------- -->
                        `);
                    adjustContainerHeight();
                }
            }catch (error) {
                console.error('Error fetching recipe details:', error);
            }
        }
    });
    // 客製化收藏夾內把食譜刪除icon(顯示、消失)------------------------------------------------------------------------------------------
    var checkediticon = 0;
    $("#edit-file").on("click",function(){
        $("#edit-file").toggleClass("turn-red");
        if(checkediticon==0){
            $(".hotreceipebookmark").each(function(index,value){
                $(this).prepend(`<i class="fa-regular fa-trash-can edit-icon" id="edit-iconid${index}"></i>`);
            })
            checkediticon=1;
        }
        else{
            $(".edit-icon").each(function(){
                $(this).remove();
            })
            checkediticon=0;
        }
    })
    // 客製化收藏夾內把食譜刪除的操作------------------------------------------------------------------------------------------
    $(document).on('click', '.edit-icon', function() {
        console.log(`移除掉第${radiocount+1}個收藏夾的第${$(this).closest('.hotreceipebookmark').prop("id")}個食譜`);
        array2D[radiocount][$(this).closest('.hotreceipebookmark').prop("id")]="null";
        for(var i=0;i<array2D[radiocount].length;i++){
            console.log(`第${radiocount}個收藏夾的第${i}個元素id為${array2D[radiocount][i]}的食譜`);
        }
        $(this).closest('.hotreceipebookmark').remove();
    });
    // 根據該食譜多寡來調整container-right的height(***超重要***)------------------------------------------------------------------------------------------
    function adjustContainerHeight() {
        const rightContainerMenu = document.querySelector('.right-container-menu');
        const containerRight = document.querySelector('.container-right');
        
        const menuHeight = rightContainerMenu.clientHeight;
        // console.log(menuHeight);
        if (menuHeight > 700) {
            containerRight.style.height = `${menuHeight}px`;
            console.log(`containerRight=${menuHeight}px`);
        }else{
            containerRight.style.height = '700px';
        }
    }
    adjustContainerHeight();
    //----------------------------------------------------------------------------------------------------------------------------------------------------------
    $(document).on("click", ".hotreceipe-img", function() {
        var receipeingredient = 3;
        var $bookmark = $(this).closest(".hotreceipebookmark");
        var $ingredients = $bookmark.find('.ingredient');
        if ($ingredients.length > 0) {
            $ingredients.remove();
            var receipeheight = parseInt($bookmark.css("height")) - $ingredients.length * 40;
            $bookmark.css("height", receipeheight + "px");
        } else {
            var receipeheight = parseInt($bookmark.css("height"));
            for (var i = 0; i < receipeingredient; i++) {
                $bookmark.append(`<div class="ingredient"><input type="checkbox" name="" class="ingredient-prepare"><span class="ingredient-name">食材名稱</span><span class="ingredient-count">10</span><span class="ingredient-unit">g</span><span class="ingredient-price">100</span>元<span></span></div>`);
                receipeheight += 40;
                // console.log(receipeheight);
                $bookmark.css("height", receipeheight + "px");
            }
        }
        $bookmark.on('transitionend', function(){
            adjustContainerHeight();
            $bookmark.off('transitionend');
        });
    });
    // ------------------------------------------------------------
    var displayleft=0;
    $(".nav-left").on("click",function(){
        $(this).toggleClass("change");
        if(displayleft==0){
            $(".left-title").css("display","block");
            displayleft=1;
        }
        else{
            $(".left-title").css("display","none");
            displayleft=0;
        }
    })
    var displayright=0;
    $(".nav-right").on("click",function(){
        $(".nav-profile-icon").remove();
        if(displayright==0){
            $(".right-title").css("display","block");
            $(".nav-right").prepend(`<i class="fa-solid fa-user fa-2x nav-profile-icon"></i>`);
            displayright=1;
        }
        else{
            $(".right-title").css("display","none");
            $(".nav-right").prepend(`<i class="fa-regular fa-user fa-2x nav-profile-icon"></i>`);
            displayright=0;
        }
    })
});
