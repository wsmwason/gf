function tool_p(){

            $.ajaxSetup({
                async: false
            });
            $.getJSON("char.json", function(data) {
            }).fail(function() {
                alert("test2");
            });

            var resultTable = $('.tab_expedscorer .results');
            $('.tab_expedscorer .calculate_btn').click(function(){
                var numberPattern = /\d+/g;
//
                var numbers = $('.pText').val().match(numberPattern);
                resultTable.empty();

                var id = $('.priorityId').val();
                var name = $('.priorityName').val();
                var type = $('.priorityType').val();
                var skillName = $('.prioritySkillName').val();
                var firstCooldownTime = $('.priorityFirstCooldownTime').val();
                var cooldownTime1 = $('.priorityCooldownTime1').val();
                var cooldownTime10 = $('.priorityCooldownTime10').val();
                var auraTarget = $('.priorityAuraTarget').val();
//
//                resultTable.append("123");
                resultTable.append("&nbsp;&nbsp;&nbsp;&nbsp;{\"id\":\""+id+"\", \"name\":\""+name+"\", \"type\":\""+type+"\",");
                resultTable.append("<br>");
                resultTable.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"hp\":{\"1\":\""+numbers[0]+"\", \"100\":\""+numbers[1]+"\"},");
                resultTable.append("<br>");
                resultTable.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"dmg\":{\"1\":\""+numbers[2]+"\", \"100\":\""+numbers[3]+"\"},");
                resultTable.append("<br>");
                resultTable.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"dodge\":{\"1\":\""+numbers[4]+"\", \"100\":\""+numbers[5]+"\"},");
                resultTable.append("<br>");
                resultTable.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"hit\":{\"1\":\""+numbers[6]+"\", \"100\":\""+numbers[7]+"\"},");
                resultTable.append("<br>");
                resultTable.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"fireOfRate\":{\"1\":\""+numbers[10]+"\", \"100\":\""+numbers[11]+"\"},");
                resultTable.append("<br>");
                resultTable.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"skill\":{");
                resultTable.append("<br>");
                resultTable.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"name\":\""+skillName+"\",");
                resultTable.append("<br>");
                resultTable.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"type\":\"\",");
                resultTable.append("<br>");
                resultTable.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"target\":\"\",");
                resultTable.append("<br>");
                resultTable.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"firstCooldownTime\":\""+firstCooldownTime+"\",");
                resultTable.append("<br>");
                resultTable.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"cooldownTime\":{\"1\":\""+cooldownTime1+"\", \"10\": \""+cooldownTime10+"\"},");
                resultTable.append("<br>");
                resultTable.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"effect\":{");
                resultTable.append("<br>");
                resultTable.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"dmg\":{\"1\":\"\", \"10\":\"\"},");
                resultTable.append("<br>");
                resultTable.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"time\":{\"1\":\"\", \"10\":\"\"}}},");
                resultTable.append("<br>");
                resultTable.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"aura\":{");
                resultTable.append("<br>");
                resultTable.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"target\":\""+auraTarget+"\", \"effect\":{");
                resultTable.append("<br>");
                resultTable.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"dmg\":{\"1\":\"\", \"5\":\"\"},");
                resultTable.append("<br>");
                resultTable.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"hit\":{\"1\":\"\", \"5\":\"\"}},");
                resultTable.append("<br>");
                resultTable.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"grid\":[");
                resultTable.append("<br>");
                resultTable.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{\"x\":\"\", \"y\":\"\"},");
                resultTable.append("<br>");
                resultTable.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{\"x\":\"\", \"y\":\"\"}]}},");
            });
}
//                var priorityManpower = parseInt($(".tab_expedscorer .priorityManpower").val(), 10);
//                var priorityAmmo = parseInt($(".tab_expedscorer .priorityAmmo").val(), 10);
//                var priorityRation = parseInt($(".tab_expedscorer .priorityRation").val(), 10);
//                var priorityPart = parseInt($(".tab_expedscorer .priorityPart").val(), 10);
//                var priorityQuickRepair = parseInt($(".tab_expedscorer .priorityQuickRepair").val(), 10);
//                var priorityQuickDone = parseInt($(".tab_expedscorer .priorityQuickDone").val(), 10);
//                var priorityContract = parseInt($(".tab_expedscorer .priorityContract").val(), 10);
//                var priorityEquipment = parseInt($(".tab_expedscorer .priorityEquipment").val(), 10);
//                var afkHH = parseInt($(".tab_expedscorer .afkH").val(), 10);
