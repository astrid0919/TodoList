$(document).ready(function () {

    //第一步
    //input.task_name 在 focus 事件觸發時，div.task_add_block 加上 -on class。
    $("input.task_name").focus(function () {
        $(this).parent().addClass("-on")
    });

    //input.task_name 在 blur 事件觸發時，div.task_add_block 移除 -on class。
    $("input.task_name").blur(function () {
        $(this).parent().removeClass("-on")
    });

    //第二步
    //按下「新增」按鈕時，將以上的待辦事項 html，新增到 ul.task_list 裡，新增到裡面的最前面。
    //輸入的待辦事項，如果文字的最左邊、最右邊有空格，需移除。(語法：JS 內建的 trim() 函式)。
    //如果沒有輸入待辦事項，按「新增」的話，不能有任何反應。 
    $("button.task_add").on("click", function () {
        let newTodo = ($("input.task_name").val()).trim();
        if (newTodo !== "") {
            let listItem =
                `<li>
        <div class="item_flex">
          <div class="left_block">
            <div class="btn_flex">
              <button type="button" class="btn_up">Move up</button>
              <button type="button" class="btn_down">Move down</button>
            </div>
          </div>
          <div class="middle_block">
            <div class="star_block">
              <span class="star" data-star="1"><i class="fas fa-star"></i></span>
              <span class="star" data-star="2"><i class="fas fa-star"></i></span>
              <span class="star" data-star="3"><i class="fas fa-star"></i></span>
              <span class="star" data-star="4"><i class="fas fa-star"></i></span>
              <span class="star" data-star="5"><i class="fas fa-star"></i></span>
            </div>
            <p class="para">${newTodo}</p>
            <input type="text" class="task_name_update -none" placeholder="更新待辦事項…" value="${newTodo}">
          </div>
          <div class="right_block">
            <div class="btn_flex">
              <button type="button" class="btn_update">Update</button>
              <button type="button" class="btn_delete">Delete</button>
            </div>
          </div>
        </div>
      </li>`
            $("ul.task_list").prepend(listItem);
            $("input.task_name").val("");
        }
    });

    //按下「Enter」鍵，也要能新增待辦事項。
    $(document).on('keypress', function (e) {
        if (e.which === 13) {
            $("button.task_add").click();
        }
    });

    //第三步
    //按下「移除」按鈕，淡出 1 秒，然後移除該筆待辦事項。
    $("ul.task_list").on("click", "button.btn_delete", function () {
        let r = confirm("Are you sure?");
        if (r) {
            //console.log(this)
            $(this).closest("li").animate({
                "opacity": 0
            }, 1000, "swing", function () {
                $(this).remove();
            });
        }
    });

    //按下「清空」按鈕，淡出 1 秒，清除全部的待辦事項。
    $("button.btn_empty").click(function () {
        let r = confirm("Are you sure?");
        if (r) {
            $("ul.task_list").children("li").animate({
                "opacity": 0
            }, 1000, "swing", function () {
                $(this).remove();
            });
        }
        //$("ul.task_list").children("li").fadeOut(1000, function(){
        //    $(this).remove();
        //});
    });

    //第四步
    //按下「更新」按鈕，出現一般文字框，然後可以更新。
    //再按下「更新」按鈕，回到不可編輯的狀態，但待辦事項要是更新的。
    //如果所更新的待辦事項，沒有輸入文字，跳出提醒視窗(alert)，顯示「請輸入待辦事項」。
    //待辦事項的文字若最左邊、最右邊有空格的話，需移除。
    $("ul.task_list").on("click", "button.btn_update", function () {
        if($(this).attr("data-edit") == undefined){
            $(this).attr("data-edit", true);
            $(this).closest("li").find("p.para").toggleClass("-none");
            $(this).closest("li").find("input.task_name_update").toggleClass("-none");
        }else{
            let updateTodo = ($(this).closest("li").find("input.task_name_update").val()).trim();
            if(updateTodo == ""){
                alert("Please enter something...");
            }else{
                $(this).closest("li").find("p.para").html(updateTodo).toggleClass("-none");
                $(this).closest("li").find("input.task_name_update").val(updateTodo).toggleClass("-none");
                $(this).removeAttr("data-edit");
            }
        }
    });

    //第五步
    //按下「往上」按鈕，與上面的待辦事項對調。按下「往下」按鈕，與下面的待辦事項對調。(註：每個待辦事項是以 li 為單位。)
    //第一個的待辦事項，「往上」按鈕按了要沒反應，最後一個的待辦事項，「往下」按鈕按了要沒反應。
    $("ul.task_list").on("click","button.btn_up , button.btn_down", function () {
        if($(this).hasClass("btn_up") && !$(this).closest("li").is(":first-child")){
            let clone_html = $(this).closest("li").clone();
            $(this).closest("li").prev().before(clone_html);
            $(this).closest("li").remove();
        }

        if($(this).hasClass("btn_down") && !$(this).closest("li").is(":last-child")){
            let clone_html = $(this).closest("li").clone();
            $(this).closest("li").next().after(clone_html);
            $(this).closest("li").remove();
        }
    });

    //第六步
    //點擊星號的時候，該星號加上 -on 這個 class，然後該筆待辦事項，星號數( data-star )小於等於點擊的星號數的話，也要加上 -on 這個 class；反之則移除。
    $("ul.task_list").on("click", "span.star", function(e){
    let current_star = parseInt($(this).attr("data-star"));
        $(this).closest("div.star_block").find("span.star").each(function(i, item){
          if( parseInt($(this).attr("data-star")) <= current_star ){
            $(this).addClass("-on");
          }else{
            $(this).removeClass("-on");
          }
      
        });
      
      });

});

