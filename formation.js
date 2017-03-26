
const TYPES = ["hg", "smg", "ar", "rf", "mg", "sg"];
const GRIDS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

var mPickerType = "";
var mPickerGrid = "";
var mCharData = [];
var mGridOrder = [];
var mFormation = [];
var mGridToUI = [];
var mGridToChar = [];

function init() {
    initFormation();
    initData();
    initDialog();

    $('.add_button').click(function() {
        openDialogPicker($(this).attr("grid_value"));
    });

    $('.char .img').addClass("hover").click(function() {
        openDialogPicker($(this).attr("grid_value"));
    });

    $('.char .level').change(function() {
        updateCharObs();
        updateUI();
    });

//    $('.char .skill_level').change(function() {
//    });
//
//    $('.char .skill_control').change(function() {
//    });


    $(".grid_container").draggable({revert: "invalid", helper: "clone"});

    $(".grid_container").droppable({
        accept: ".grid_container",
        activeClass: "ui-state-hover",
        hoverClass: "ui-state-active",
        drop: function(event, ui) {

            var draggable = ui.draggable, droppable = $(this),
                dragPos = draggable.position(), dropPos = droppable.position();

            draggable.css({
                left: dropPos.left+'px',
                top: dropPos.top+'px'
            });

            droppable.css({
                left: dragPos.left+'px',
                top: dragPos.top+'px'
            });
            draggable.swap(droppable);
            swapGridUI(draggable, droppable);
            updateCharObs();
            updateUI();
        }
    });

    $('.view_equipment').change(function() {
        if ($(this).is(":checked")) {
            $('.grid_container .char').hide();
            $('.grid_container .equipment_panel').show();
        } else {
            $('.grid_container .char').show();
            $('.grid_container .equipment_panel').hide();
        }
    });
}

function initDialog() {
    $('#picker').dialog({autoOpen: false, width: 'auto'});
    $('#picker_by_type').dialog({autoOpen: false, width: 'auto'});
    $('#picker_by_type').dialog({position: {my: "left top", at: "right top", of: ".formation"}});

    var row = $('<tr></tr>');
    for (var i in TYPES) {
        var v = TYPES[i];
        var item = $('<div></div>').addClass("button hover").html(v).attr("value", v).click(function() {
            openDialogPickerByType($(this).attr("value"));
        });
        $('<td></td>').append(item).appendTo(row);
    }

    $('#picker table').append(row);

    $('#picker .remove').click(function() {
        removeChar(mPickerGrid);
    });
}

function removeChar(grid) {
    $("." + mGridToUI[grid] + " .add_button").show();
    $("." + mGridToUI[grid] + " .char").hide();

    $('#picker').dialog("close");
    mGridToChar[grid] = "";
    updateCharObs();
    updateUI();
}

function initFormation() {
    mGridOrder.push(["7", "8", "9"]);
    mGridOrder.push(["4", "5", "6"]);
    mGridOrder.push(["1", "2", "3"]);
    for (var i in mGridOrder) {
        var row = $('<tr></tr>');

        for (var j in mGridOrder[i]) {
            var order = mGridOrder[i][j];
            var item = $('.factory .grid_container').clone().addClass("grid_container_" + order)
                    .find(".add_button").attr("grid_value", order).end()
                    .find(".img").attr("grid_value", order).end()
                    .find(".level").attr("grid_value", order).end()
                    .find(".skill_level").attr("grid_value", order).end()
                    .find(".skill_control").attr("grid_value", order).end()
                    .find(".char").attr("grid_value", order).end();
            $('<td></td>').addClass("grid").append(item).appendTo(row);
            //$('<td></td>').addClass("grid").append(item).appendTo(row);

            mGridToUI[order] = "grid_container_" + order;
            mGridToChar[order] = "";
        }

        $('.tab_formation .formation').append(row);
    }

    for (var i = 1; i <= 5; i++) {
        var item = $('.factory .char_performance').clone().addClass("char_performance_" + i);
        $('.panel.performance').append(item);
    }
}

function swapGridUI(a, b) {
//    var aGrid = a.find(".add_button").attr("value");
//    var bGrid = b.find(".add_button").attr("value");
//    swapElementValue(a, b, ".add_button");
//    swapElementValue(a, b, ".char");
//
    var aClass = "";
    a.classes(function(c) {
        if (c.includes("grid_container_")) {
            aClass = c;
        }
    });

    var bClass = "";
    b.classes(function(c) {
        if (c.includes("grid_container_")) {
            bClass = c;
        }
    });
//
//    a.removeClass(aClass).addClass(bClass);
//    b.removeClass(bClass).addClass(aClass);

    swapArrayElements(mGridToChar, mGridToUI.indexOf(aClass), mGridToUI.indexOf(bClass));
    swapArrayElements(mGridToUI, mGridToUI.indexOf(aClass), mGridToUI.indexOf(bClass));
}

function swapElementValue(a, b, c) {
    var aE = a.find(c);
    var bE = b.find(c);

    var t = aE.attr("value");
    aE.attr("value", bE.attr("value"));
    bE.attr("value", t);
}

function openDialogPicker(grid) {
    mPickerGrid = getGridByUIValue(grid);
    $('#picker').dialog("open");
    $('#picker').dialog({position: {my: "left top", at: "center", of: ".grid_container_" + grid}});
    $('#picker_by_type').dialog("close");
}

function getGridByUIValue(v) {
    return mGridToUI.indexOf("grid_container_" + v);
}

function openDialogPickerByType(type) {
//    mPickerType = type;
    $('#picker_by_type').dialog("open");
    $('#picker').dialog("close");

    for (var i = 5; i >= 2; i--) {
        var count = 0;

        var rows = [];
        var row = $('<tr></tr>');
        var grepList = $.grep(mCharData, function(e) {return e.type == type && e.rarity == i;});
        grepList.forEach(function(v) {
            var item = $('<div></div>').addClass("button hover rarity_"+i).html(v.name).attr("value", v.id).click(function() {
                addChar(mPickerGrid, $(this).attr("value"));
            });

            $('<td></td>').append(item).appendTo(row);

            count++;
            if (count % 5 == 0) {
                rows.push(row);
                row = $('<tr></tr>');
                count = 0;
            }
        });
        rows.push(row);

        $("#picker_by_type .rarity_"+i+" table").html("");
        $("#picker_by_type .rarity_"+i+" table").append(rows);
    }
}

function initData() {
    $.ajaxSetup({
        async: false
    });
    $.getJSON("char.json", function(data) {
        $.each(data.chars, function(key, val) {
            mCharData.push(val);
        });
    }).fail(function() {
        alert("load json data fail");
    });
}

function addChar(grid, id) {
    $('#picker_by_type').dialog("close");
    $('#picker').dialog("close");

    $("." + mGridToUI[grid] + " .add_button").hide();
    $("." + mGridToUI[grid] + " .char .img").html(getCharImgUIObj(id));
    $("." + mGridToUI[grid] + " .char").show();

    mGridToChar[grid] = getChar(id);
    var auraUI = $("." + mGridToUI[grid] + " .aura_container");
    updateAuraUI(auraUI, mGridToChar[grid]);
    updateCharObs();
    updateUI();
}

function updateAuraUI(auraUI, charObj) {
    grids = getAuraGridFromChar(charObj);
    var selfGrid = 5;
    if ('self' in charObj.aura) {
        selfGrid = getGridFromXY(charObj.aura["self"]);
    }

    for (var i = 1; i <= 9; i++) {
        if (grids.indexOf(i) >= 0) {
            auraUI.find(".aura_" + i).css("background-color", "#00FFDC");
        } else if (i == selfGrid) {
            auraUI.find(".aura_" + i).css("background-color", "white");
        } else {
            auraUI.find(".aura_" + i).css("background-color", "#6A6A6A");
        }
    }
}

function getGridFromXY(val) {
    var grid = 0;
    if (val.x == "0" && val.y == "0") {
        grid = 5;
    }
    if (val.x == "0" && val.y == "1") {
        grid = 2;
    }
    if (val.x == "0" && val.y == "-1") {
        grid = 8;
    }
    if (val.x == "1" && val.y == "0") {
        grid = 6;
    }
    if (val.x == "1" && val.y == "1") {
        grid = 3;
    }
    if (val.x == "1" && val.y == "-1") {
        grid = 9;
    }
    if (val.x == "-1" && val.y == "0") {
        grid = 4;
    }
    if (val.x == "-1" && val.y == "1") {
        grid = 1;
    }
    if (val.x == "-1" && val.y == "-1") {
        grid = 7;
    }

    return grid;
}

function xyToGrid(x, y) {
    var grid = -1;
    if (x == "0" && y == "0") {
        grid = 5;
    }
    if (x == "0" && y == "1") {
        grid = 2;
    }
    if (x == "0" && y == "-1") {
        grid = 8;
    }
    if (x == "1" && y == "0") {
        grid = 6;
    }
    if (x == "1" && y == "1") {
        grid = 3;
    }
    if (x == "1" && y == "-1") {
        grid = 9;
    }
    if (x == "-1" && y == "0") {
        grid = 4;
    }
    if (x == "-1" && y == "1") {
        grid = 1;
    }
    if (x == "-1" && y == "-1") {
        grid = 7;
    }

    return grid;
}

function getAuraGridFromChar(charObj) {
    var grids = [];
    $.each(charObj.aura.grid, function(key, val) {
        grids.push(getGridFromXY(val));
    });

    return grids;
}

function getCharImgUIObj(id) {
    var img = $('<img>').attr("src","assets/n/" + id + ".png");
    return img;
}

function updateUI() {
    var index = 1;
    for (var i in GRIDS) {
        if (mGridToChar[GRIDS[i]] != "") {
            var charObj = mGridToChar[GRIDS[i]];
            var lv = 100;
            var cp = $(".char_performance_" + index);
            cp.find(".value.name").html(charObj.name).end()
            .find(".value.hp").html(charObj.c.hp).end()
            .find(".value.dmg").html(charObj.c.dmg).end()
            .find(".value.hit").html(charObj.c.hit).end()
            .find(".value.dodge").html(charObj.c.dodge).end()
            .find(".value.fireOfRate").html(charObj.c.fireOfRate).end()
            .find(".value.criRate").html(charObj.c.criRate).end()
            .find(".value.dps").html(charObj.c.dps.toFixed(2)).end();
            index++;
        }
    }

    while (index <= 5) {
        var cp = $(".char_performance_" + index);
        cp.find(".value.name").html("-").end()
        .find(".value.hp").html("-").end()
        .find(".value.dmg").html("-").end()
        .find(".value.hit").html("-").end()
        .find(".value.dodge").html("-").end()
        .find(".value.fireOfRate").html("-").end()
        .find(".value.criRate").html("-").end()
        .find(".value.dps").html("-").end();
        index++;
    }
}

function charGetAttrByLevel(attr, lv) {
    var v = ((1.0 * attr["100"] - 1.0 * attr["1"]) / 99 * (lv - 1) + attr["1"] * 1.0);
    return parseInt(v);
}

function getChar(id){
    var grepList = $.grep(mCharData, function(e){return e.id == id;});
    var obj =  grepList[0];
    obj["criRate"] = 20;
    if (obj.type == "rf") obj["criRate"] = 40;
    return grepList[0];
}

function updateCharObs() {
    for (var i in GRIDS) {
        if (mGridToChar[GRIDS[i]] != "") {
            var charObj = mGridToChar[GRIDS[i]];
            var controlUI = $("." + mGridToUI[GRIDS[i]] + " .control_container");

            charObj.c = {};
            charObj.c.level = parseInt(controlUI.find(".level").val());
            charObj.c.link = getLink(charObj.c.level);
            charObj.c.hp = charGetAttrByLevel(charObj.hp, charObj.c.level);
            charObj.c.dmg = charGetAttrByLevel(charObj.dmg, charObj.c.level);
            if (1 == 1) {
                charObj.c.dmg += 2;
            }
            charObj.c.hit = charGetAttrByLevel(charObj.hit, charObj.c.level);
            charObj.c.dodge = charGetAttrByLevel(charObj.dodge, charObj.c.level);
            charObj.c.fireOfRate = charGetAttrByLevel(charObj.fireOfRate, charObj.c.level);
            charObj.c.criRate = charObj.criRate;

            charObj.c.aura_dmg = 0;
            charObj.c.aura_hit = 0;
            charObj.c.aura_dodge = 0;
            charObj.c.aura_fireOfRate = 0;
            charObj.c.aura_criRate = 0;

            charObj.c.attackFrame = Math.ceil(50.0 / charObj.c.fireOfRate * 30.0);
            var enemy_dodge = 10.0;
            var hitRate = charObj.c.hit / (charObj.c.hit + enemy_dodge);
            charObj.c.dps = charObj.c.dmg * 30.0 / charObj.c.attackFrame * (1 - charObj.c.criRate * 0.01 + 1.5 * charObj.c.criRate * 0.01) * hitRate;
        }
    }

    for (var i in GRIDS) {
        var grid = GRIDS[i];
        if (mGridToChar[grid] != "") {
            var charObj = mGridToChar[grid];

            var aura = charObj.aura;
            var selfPos = gridToXY(grid);

            var auraSelfX = "0";
            var auraSelfY = "0";
            if ('self' in aura) {
                auraSelfX = aura["self"].x;
                auraSelfY = aura["self"].y;
            }

            $.each(aura.grid, function(key, val) {
                var diffX = parseInt(val.x) - parseInt(auraSelfX);
                var diffY = parseInt(val.y) - parseInt(auraSelfY);


                var targetX = selfPos.x + diffX;
                var targetY = selfPos.y + diffY;
                var targetGrid = xyToGrid(targetX, targetY);
                if (targetGrid != -1) {
                    var targetObj = mGridToChar[targetGrid];
                    if (targetObj != "" && (targetObj.type == aura.target || aura.target == "all")) {
                        $.each(getAuraEffectByLink(aura.effect, charObj.c.link), function(key, val) {
                            targetObj.c["aura_" + key] += val;
                        });
                    }
                }
            });


        }
    }

    for (var i in GRIDS) {
        if (mGridToChar[GRIDS[i]] != "") {
            var charObj = mGridToChar[GRIDS[i]];
            var controlUI = $("." + mGridToUI[GRIDS[i]] + " .control_container");

            charObj.c.dmg = Math.floor(charObj.c.dmg * (1 + 0.01 * charObj.c.aura_dmg));
            charObj.c.hit = Math.floor(charObj.c.hit * (1 + 0.01 * charObj.c.aura_hit));
            charObj.c.dodge = Math.floor(charObj.c.dodge * (1 + 0.01 * charObj.c.aura_dodge));
            charObj.c.fireOfRate = Math.floor(charObj.c.fireOfRate * (1 + 0.01 * charObj.c.aura_fireOfRate));
            charObj.c.fireOfRate = Math.min(charObj.c.fireOfRate, 120);
            charObj.c.criRate = Math.floor(charObj.c.criRate * (1 + 0.01 * charObj.c.aura_criRate));
            charObj.c.criRate = Math.min(charObj.c.criRate, 100);

            charObj.c.attackFrame = Math.ceil(50.0 / charObj.c.fireOfRate * 30.0);
            var enemy_dodge = 10.0;
            var hitRate = charObj.c.hit / (charObj.c.hit + enemy_dodge);
            charObj.c.dps = charObj.c.dmg * 30.0 / charObj.c.attackFrame * (1 - charObj.c.criRate * 0.01 + 1.5 * charObj.c.criRate * 0.01) * hitRate;
        }
    }
}

function getAuraEffectByLink(auraEffect, link) {
    var l = {};
    $.each(auraEffect, function(key, val) {
        var e = (1 * val["5"] - 1 * val["1"]) / 4 * (link - 1) + 1 * val["1"];
        l[key] = e;
    });

    return l;
}

function getLink(level) {
    if (level >= 90) return 5;
    if (level >= 70) return 4;
    if (level >= 30) return 3;
    if (level >= 10) return 2;
    return 1;
}

function gridToXY(grid) {
    var pos = {};
    if (grid == "7") {
        pos.x = -1;
        pos.y = -1;
    }
    if (grid == "8") {
        pos.x = 0;
        pos.y = -1;
    }
    if (grid == "9") {
        pos.x = 1;
        pos.y = -1;
    }
    if (grid == "4") {
        pos.x = -1;
        pos.y = 0;
    }
    if (grid == "5") {
        pos.x = 0;
        pos.y = 0;
    }
    if (grid == "6") {
        pos.x = 1;
        pos.y = 0;
    }
    if (grid == "1") {
        pos.x = -1;
        pos.y = 1;
    }
    if (grid == "2") {
        pos.x = 0;
        pos.y = 1;
    }
    if (grid == "3") {
        pos.x = 1;
        pos.y = 1;
    }

    return pos;
}


jQuery.fn.swap = function(b){
    // method from: http://blog.pengoworks.com/index.cfm/2008/9/24/A-quick-and-dirty-swap-method-for-jQuery
    b = jQuery(b)[0];
    var a = this[0];
    var t = a.parentNode.insertBefore(document.createTextNode(''), a);
    b.parentNode.insertBefore(a, b);
    t.parentNode.insertBefore(b, t);
    t.parentNode.removeChild(t);
    return this;
};

;!(function ($) {
    $.fn.classes = function (callback) {
        var classes = [];
        $.each(this, function (i, v) {
            var splitClassName = v.className.split(/\s+/);
            for (var j = 0; j < splitClassName.length; j++) {
                var className = splitClassName[j];
                if (-1 === classes.indexOf(className)) {
                    classes.push(className);
                }
            }
        });
        if ('function' === typeof callback) {
            for (var i in classes) {
                callback(classes[i]);
            }
        }
        return classes;
    };
})(jQuery);

var swapArrayElements = function(arr, indexA, indexB) {
      var temp = arr[indexA];
        arr[indexA] = arr[indexB];
          arr[indexB] = temp;
};
//alert(JSON.stringify(charObj));
