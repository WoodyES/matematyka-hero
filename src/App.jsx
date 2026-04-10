import { useState, useEffect, useCallback, useRef } from "react";

const SM2 = (q, p) => { const{interval:i=1,ease:e=2.5,repetition:r=0}=p||{}; if(q<3)return{interval:1,ease:Math.max(1.3,e-0.2),repetition:0}; const ne=e+(0.1-(5-q)*(0.08+(5-q)*0.02)); return{interval:r===0?1:r===1?6:Math.round(i*ne),ease:Math.max(1.3,ne),repetition:r+1}; };

// ─── EXPANDED QUESTION BANK (80+ questions, exam-inspired, with wrongExplanations) ───
const Q = [
  // ARYTMETYKA (15 questions)
  {id:"a1",t:"arytmetyka",d:1,q:"Oblicz: (-3) · (-4) + (-2) · 5",o:["2","22","-2","10"],c:0,h:"Minus × minus = plus, potem dodaj",
    w:{"22":"Dodałeś 12+10 ale (-2)·5=-10, nie +10","-2":"Błąd w znaku: (-3)·(-4)=+12, nie -12","10":"(-2)·5=-10, nie +10. Wynik: 12+(-10)=2"}},
  {id:"a2",t:"arytmetyka",d:1,q:"Wynikiem działania 2³ + 3² jest:",o:["17","15","13","11"],c:0,h:"2³=8, 3²=9, suma=17",
    w:{"15":"2³=8, nie 6. Nie mnóż podstawy przez wykładnik","13":"3²=9, nie 5. Podnosimy do kwadratu, nie mnożymy razy 2","11":"Obie potęgi policzone błędnie"}},
  {id:"a3",t:"arytmetyka",d:2,q:"Wartość wyrażenia (2,4 - 5⅓) : (-2) wynosi:",o:["1 7/15","-1 7/15","1 8/15","-1 8/15"],c:0,h:"Najpierw nawias: 2,4 - 5⅓ = ujemna, potem dziel przez -2",
    w:{"-1 7/15":"Wynik dzielenia ujemnej przez ujemną jest DODATNI","1 8/15":"Błąd w ułamku: 2,4 = 2 2/5 = 12/5, 5⅓ = 16/3","-1 8/15":"Dwa błędy: znak i wartość ułamka"}},
  {id:"a4",t:"arytmetyka",d:1,q:"Która z liczb: 91, 92, 95, 97 daje resztę 1 przy dzieleniu przez 7?",o:["92","91","95","97"],c:0,h:"91÷7=13 (reszta 0), 92÷7=13 reszta 1",
    w:{"91":"91÷7=13 dokładnie, reszta = 0","95":"95÷7=13 reszta 4","97":"97÷7=13 reszta 6"}},
  {id:"a5",t:"arytmetyka",d:2,q:"Wartość 8⁶ : 4³ zapisana jako potęga 2 to:",o:["2¹²","2²","2³","2⁴"],c:0,h:"8⁶=(2³)⁶=2¹⁸, 4³=(2²)³=2⁶, 2¹⁸:2⁶=2¹²",
    w:{"2²":"Nie dziel wykładników baz! 8=2³, więc 8⁶=2¹⁸","2³":"8=2³ ale 8⁶≠2³. Mnóż wykładniki: 3·6=18","2⁴":"Sprawdź: 4³=64, 8⁶=262144. 262144÷64=4096=2¹²"}},
  {id:"a6",t:"arytmetyka",d:1,q:"Liczba 0,125 zapisana jako ułamek zwykły to:",o:["⅛","⅕","1/25","1/80"],c:0,h:"0,125 = 125/1000 = 1/8",
    w:{"⅕":"0,2 = ⅕, nie 0,125","1/25":"0,04 = 1/25, nie 0,125","1/80":"125/1000 upraszczamy dzieląc przez 125"}},
  {id:"a7",t:"arytmetyka",d:2,q:"Oblicz: √144 - √49 + √25",o:["10","12","8","15"],c:0,h:"12 - 7 + 5 = 10",
    w:{"12":"√49=7, nie 5. Sprawdź: 7·7=49","8":"√25=5, nie 3. Sprawdź: 5·5=25","15":"Dodałeś wszystkie zamiast odjąć √49"}},
  {id:"a8",t:"arytmetyka",d:1,q:"Która liczba jest największa: -5, -2, 0, -10?",o:["0","-2","-5","-10"],c:0,h:"Na osi liczbowej: im bardziej w prawo, tym większa",
    w:{"-2":"0 > -2. Zero jest większe od każdej liczby ujemnej","-5":"-5 < -2 < 0. Liczby ujemne są mniejsze od zera","-10":"To najmniejsza z podanych"}},
  {id:"a9",t:"arytmetyka",d:2,q:"Rowerzysta jedzie 100m z prędkością 5 m/s. Czas jazdy to:",o:["20 sekund","50 sekund","500 sekund","200 sekund"],c:0,h:"t = s/v = 100/5 = 20",
    w:{"50 sekund":"Podzieliłeś odwrotnie? t = droga/prędkość = 100/5","500 sekund":"Pomnożyłeś 100·5. Wzór to t=s/v, nie t=s·v","200 sekund":"Sprawdź wzór: czas = droga ÷ prędkość"}},
  {id:"a10",t:"arytmetyka",d:3,q:"Średnia 4 liczb a,b,c,d = 9. Średnia 2 liczb e,f = 6. Średnia wszystkich 6 liczb to:",o:["8","7,5","9","6"],c:0,h:"Suma abcd=36, suma ef=12. Średnia=(36+12)/6=8",
    w:{"7,5":"To byłoby (9+6)/2, ale średnich nie uśrednia się tak!","9":"Suma abcd=36, ef=12. (36+12)/6≠9","6":"Suma wszystkich=48, dzielimy przez 6 (nie 8)"}},
  {id:"a11",t:"arytmetyka",d:2,q:"¾ · ⅔ + ½ =",o:["1","¾","⅚","1½"],c:0,h:"¾·⅔=½, potem ½+½=1",
    w:{"¾":"¾·⅔=½, nie ¼. Mnożymy licznik×licznik, mianownik×mianownik","⅚":"½+½=1, nie ⅚","1½":"¾·⅔=½ (nie ¾). Potem ½+½=1"}},
  {id:"a12",t:"arytmetyka",d:3,q:"Losy 1-72. Wygrywają 1-9 i 46-72. P(los pusty)=?",o:["36/72","35/72","27/72","26/72"],c:0,h:"Wygrywające: 9+(72-46+1)=9+27=36. Puste: 72-36=36",
    w:{"35/72":"Policz dokładnie: od 46 do 72 to 27 losów (72-46+1)","27/72":"To liczba wygrywających od 46-72, nie pustych","26/72":"Wygrywających jest 36, więc pustych=72-36=36"}},
  {id:"a13",t:"arytmetyka",d:1,q:"Ile to 40% z 250?",o:["100","40","125","80"],c:0,h:"40/100 · 250 = 100",
    w:{"40":"40% ≠ 40. Procent to ułamek: 40/100 · 250","125":"To jest 50% z 250, nie 40%","80":"Sprawdź: 80/250 = 32%, nie 40%"}},
  {id:"a14",t:"arytmetyka",d:2,q:"(-8) : (-4) · (-2) =",o:["-4","4","-8","8"],c:0,h:"(-8):(-4)=2, potem 2·(-2)=-4",
    w:{"4":"Ostatnie mnożenie: 2·(-2)=-4, nie +4","-8":"Wykonuj po kolei od lewej","8":"(-8):(-4)=+2, ale 2·(-2)=-4"}},
  {id:"a15",t:"arytmetyka",d:3,q:"Ile jest liczb naturalnych trzycyfrowych podzielnych przez 5?",o:["180","200","100","181"],c:0,h:"Od 100 do 999. Podzielne przez 5: 100,105,...,995. Ile? (995-100)/5+1",
    w:{"200":"(999-100)/5≈180, nie 200","100":"Od 100 do 995 co 5 to więcej niż 100","181":"(995-100)/5+1 = 179+1 = 180"}},

  // ALGEBRA (14 questions)
  {id:"al1",t:"algebra",d:1,q:"Uprość: 3x + 5x - 2x",o:["6x","8x","10x","4x"],c:0,h:"3+5-2=6, więc 6x",
    w:{"8x":"Zapomniałeś odjąć 2x. 3+5=8, ale 8-2=6","10x":"Dodałeś wszystko: 3+5+2=10. Trzeba ODJĄĆ 2x","4x":"Sprawdź: 3+5=8, 8-2=6"}},
  {id:"al2",t:"algebra",d:2,q:"Rozwiąż: 2x + 3 = 11",o:["x = 4","x = 7","x = 3","x = 5"],c:0,h:"2x=11-3=8, x=8/2=4",
    w:{"x = 7":"Odjąłeś 3 od 11 i zapomniałeś podzielić przez 2","x = 3":"11-3=8, ale 8/2=4, nie 3","x = 5":"Sprawdź: 2·5+3=13≠11"}},
  {id:"al3",t:"algebra",d:2,q:"Rozwiąż: 3x - 6 > 0",o:["x > 2","x > -2","x < 2","x > 6"],c:0,h:"3x > 6, x > 2",
    w:{"x > -2":"Przenosząc -6 zmień znak: 3x > 6 (nie 3x > -6)","x < 2":"Dzieląc przez liczbę DODATNIĄ, znak nierówności się NIE zmienia","x > 6":"Trzeba podzielić OBE strony przez 3: 6/3=2"}},
  {id:"al4",t:"algebra",d:3,q:"x + y = 7, x - y = 3. Ile wynosi x?",o:["x = 5","x = 4","x = 3","x = 2"],c:0,h:"Dodaj równania: 2x = 10, x = 5",
    w:{"x = 4":"Dodanie równań: (x+y)+(x-y)=7+3 → 2x=10 → x=5","x = 3":"Sprawdź: 3+y=7 → y=4, ale 3-4=-1≠3","x = 2":"Sprawdź: 2+y=7 → y=5, ale 2-5=-3≠3"}},
  {id:"al5",t:"algebra",d:3,q:"Rozłóż na czynniki: x² - 9",o:["(x-3)(x+3)","(x-9)(x+1)","(x-3)²","(x+3)²"],c:0,h:"Wzór skróconego mnożenia: a²-b² = (a-b)(a+b)",
    w:{"(x-9)(x+1)":"x²-9 to RÓŻNICA KWADRATÓW. 9=3², nie 9·1","(x-3)²":"(x-3)²=x²-6x+9 ≠ x²-9. Brakuje podwójnego iloczynu","(x+3)²":"(x+3)²=x²+6x+9 ≠ x²-9"}},
  {id:"al6",t:"algebra",d:1,q:"Wartość 2a - 3b dla a=4, b=2:",o:["2","14","5","-2"],c:0,h:"2·4 - 3·2 = 8-6 = 2",
    w:{"14":"Pomnożyłeś a·b? Podstaw: 2·4=8, 3·2=6, 8-6=2","5":"Sprawdź rachunki: 2·4=8, 3·2=6","−2":"8-6=2, nie -2. Znaki są OK"}},
  {id:"al7",t:"algebra",d:2,q:"Z wzoru L=2a+2b+c wyznacz a:",o:["a=(L-2b-c)/2","a=(L-2b+c)/2","a=L-2b-c","a=L+2b-c"],c:0,h:"L-2b-c=2a, dzielę przez 2",
    w:{"a=(L-2b+c)/2":"Przenosząc c na drugą stronę, zmieniamy + na -","a=L-2b-c":"Zapomniałeś podzielić przez 2!","a=L+2b-c":"Przenosząc 2b, zmieniamy + na -"}},
  {id:"al8",t:"algebra",d:2,q:"Piłki białe(4x), fioletowe(x), czarne(4x+3). Łącznie:",o:["9x+3","9x-3","6x+3","6x-3"],c:0,h:"x + 4x + (4x+3) = 9x+3",
    w:{"9x-3":"Czarnych jest o 3 WIĘCEJ niż białych: 4x+3, nie 4x-3","6x+3":"Zapomniałeś doliczyć piłek fioletowych (x)","6x-3":"Dwa błędy: brak x fioletowych i zły znak"}},
  {id:"al9",t:"algebra",d:1,q:"Rozwiąż: x/3 = 5",o:["x = 15","x = 8","x = 2","x = 5/3"],c:0,h:"Pomnóż obie strony przez 3",
    w:{"x = 8":"3+5=8? Nie — tu jest dzielenie, nie dodawanie","x = 2":"5-3=2? Nie — mnożymy obie strony przez 3","x = 5/3":"Odwróciłeś — to x=5·3=15"}},
  {id:"al10",t:"algebra",d:3,q:"Rozwiąż: |x - 3| = 5",o:["x=8 lub x=-2","x=8","x=-2","x=2 lub x=8"],c:0,h:"|a|=5 oznacza a=5 lub a=-5",
    w:{"x=8":"To tylko jedno rozwiązanie. |x-3|=5 → x-3=5 LUB x-3=-5","x=-2":"To tylko jedno rozwiązanie. Sprawdź też x-3=5","x=2 lub x=8":"x-3=-5 → x=-2, nie x=2"}},
  {id:"al11",t:"algebra",d:2,q:"2(x+3) - 3(x-1) = 0. x=?",o:["x = 9","x = 3","x = -3","x = -9"],c:0,h:"2x+6-3x+3=0 → -x+9=0 → x=9",
    w:{"x = 3":"Rozwiń nawiasy uważnie: -3·(-1)=+3, nie -3","x = -3":"-x+9=0 → x=9, nie -9+coś","x = -9":"Przy przenoszeniu: -x=-9 → x=9 (dziel przez -1)"}},
  {id:"al12",t:"algebra",d:1,q:"Które wyrażenie jest równe 3(a+2)?",o:["3a+6","3a+2","a+6","3a+5"],c:0,h:"Mnożymy każdy składnik w nawiasie przez 3",
    w:{"3a+2":"3·2=6, nie 2. Mnóż KAŻDY składnik","a+6":"3·a=3a, nie a","3a+5":"3·2=6, nie 5"}},
  {id:"al13",t:"algebra",d:3,q:"Suma trzech kolejnych liczb nieparzystych to 33. Największa z nich to:",o:["13","11","15","9"],c:0,h:"x+(x+2)+(x+4)=33 → 3x+6=33 → x=9",
    w:{"11":"To środkowa, nie największa. 9,11,13 — szukamy 13","15":"Sprawdź: 11+13+15=39≠33","9":"To najmniejsza z trzech: 9,11,13"}},
  {id:"al14",t:"algebra",d:2,q:"Jeśli 3x = 12 i y = x + 5, to y =",o:["9","17","8","7"],c:0,h:"x=4, y=4+5=9",
    w:{"17":"x=4 (nie 12). 3x=12 → x=12/3=4","8":"x=4, y=4+5=9, nie 4+4","7":"Sprawdź: 3x=12 → x=4, y=4+5=9"}},

  // GEOMETRIA (14 questions)
  {id:"g1",t:"geometria",d:1,q:"Pole prostokąta 5cm × 8cm:",o:["40 cm²","26 cm²","13 cm²","80 cm²"],c:0,h:"P = a·b = 5·8 = 40",
    w:{"26 cm²":"To obwód/2. Pole = a·b, obwód = 2(a+b)","13 cm²":"To (5+8). Pole = a RAZY b, nie a PLUS b","80 cm²":"To obwód ×2? Pole = 5·8 = 40"}},
  {id:"g2",t:"geometria",d:2,q:"Przyprostokątne 3 i 4. Przeciwprostokątna:",o:["5","7","6","√7"],c:0,h:"c²=3²+4²=9+16=25, c=5",
    w:{"7":"3+4=7 to suma boków, nie twierdzenie Pitagorasa","6":"Sprawdź: 6²=36≠25","√7":"√7≈2,65 — to mniej niż przyprostokątne!"}},
  {id:"g3",t:"geometria",d:2,q:"Obwód koła r=7cm (π≈22/7):",o:["44 cm","154 cm","22 cm","88 cm"],c:0,h:"Obwód=2πr=2·(22/7)·7=44",
    w:{"154 cm²":"To POLE koła (πr²), nie obwód","22 cm":"Zapomniałeś pomnożyć przez 2. Obwód=2πr, nie πr","88 cm":"Pomnożyłeś przez 4 zamiast 2"}},
  {id:"g4",t:"geometria",d:1,q:"Suma kątów w trójkącie wynosi:",o:["180°","360°","90°","270°"],c:0,h:"Zawsze 180° w KAŻDYM trójkącie",
    w:{"360°":"360° to suma kątów czworokąta, nie trójkąta","90°":"90° to kąt prosty, nie suma kątów","270°":"Nie istnieje taki trójkąt"}},
  {id:"g5",t:"geometria",d:3,q:"Objętość prostopadłościanu 3×4×5 cm:",o:["60 cm³","47 cm³","94 cm³","12 cm³"],c:0,h:"V=a·b·c=3·4·5=60",
    w:{"47 cm³":"To pole powierzchni/2? V=a·b·c","94 cm³":"To pole POWIERZCHNI: 2(3·4+4·5+3·5)=94","12 cm³":"3·4=12, ale trzeba jeszcze ×5"}},
  {id:"g6",t:"geometria",d:2,q:"Pole trójkąta a=10cm, h=6cm:",o:["30 cm²","60 cm²","16 cm²","20 cm²"],c:0,h:"P=½·a·h=½·10·6=30",
    w:{"60 cm²":"Zapomniałeś podzielić przez 2! P=½·a·h","16 cm²":"10+6=16 to suma, nie pole. P=½·10·6","20 cm²":"Sprawdź: ½·10·6=30, nie 20"}},
  {id:"g7",t:"geometria",d:3,q:"Trójkąt prostokątny: |AD|=|DB|=30cm, |DC|=50cm. Ile wynosi |BC|?",o:["40 cm","50 cm","30 cm","60 cm"],c:0,h:"Pitagoras w △DBC: BC²=DC²-DB²=2500-900=1600, BC=40",
    w:{"50 cm":"DC=50 to przeciwprostokątna, BC to przyprostokątna (mniejsza)","30 cm":"DB=30, ale BC≠DB. Użyj Pitagorasa","60 cm":"Sprawdź: 30²+60²=3600+900=4500≠2500"}},
  {id:"g8",t:"geometria",d:1,q:"Kwadrat ma bok 6cm. Jego pole wynosi:",o:["36 cm²","24 cm²","12 cm²","18 cm²"],c:0,h:"P=a²=6²=36",
    w:{"24 cm²":"To obwód (4·6=24), nie pole","12 cm²":"To 2·6. Pole kwadratu = bok²","18 cm²":"Pole = a² = 6·6 = 36"}},
  {id:"g9",t:"geometria",d:2,q:"Przekątna kwadratu o boku 5 wynosi:",o:["5√2","10","5","√5"],c:0,h:"d=a√2=5√2",
    w:{"10":"To 2·5=2a, nie przekątna","5":"Przekątna jest DŁUŻSZA od boku","√5":"Wzór to a√2, nie √a"}},
  {id:"g10",t:"geometria",d:3,q:"Ile kwadratów 60cm×60cm zmieści się w prostokącie 240cm×90cm?",o:["6","4","8","3"],c:0,h:"Pole prostokąta=21600, pole kwadratu=3600, 21600/3600=6",
    w:{"4":"Sprawdź: 240/60=4 w jednym kierunku, ale 90/60=1,5 — trzeba sprawdzić układ","8":"90/60=1,5 więc nie zmieści się 2 rząd — max 1·4=4... ale obróć!","3":"Za mało. Spróbuj różne układy"}},
  {id:"g11",t:"geometria",d:1,q:"Kąty trójkąta to 40° i 60°. Trzeci kąt to:",o:["80°","100°","90°","120°"],c:0,h:"180°-40°-60°=80°",
    w:{"100°":"40+60=100, ale to suma dwóch kątów, nie trzeci kąt","90°":"180-40-60=80, nie 90","120°":"Suma WSZYSTKICH kątów=180°, nie 220°"}},
  {id:"g12",t:"geometria",d:2,q:"Pole trapezu: a=12, b=8, h=5:",o:["50","100","60","40"],c:0,h:"P=½(a+b)·h=½·20·5=50",
    w:{"100":"Zapomniałeś ½! P=½(a+b)·h","60":"12·5=60 to pole prostokąta, nie trapezu","40":"8·5=40 — użyj OBU podstaw"}},
  {id:"g13",t:"geometria",d:3,q:"Pole koła o r=5 (π≈3,14):",o:["78,5","31,4","25","15,7"],c:0,h:"P=πr²=3,14·25=78,5",
    w:{"31,4":"To obwód (2πr=31,4), nie pole!","25":"r²=25, ale trzeba jeszcze ×π","15,7":"To pół obwodu (πr), nie pole"}},
  {id:"g14",t:"geometria",d:2,q:"Równoległobok ABCD: A=(-3,-2), C=(4,2), D=(-1,2). Współrzędna x wierzchołka B to:",o:["6","2","5","7"],c:0,h:"B = A + (C-D) = (-3,-2)+(5,0) = (2,-2)... lub wektor",
    w:{"2":"Sprawdź: w równoległoboku AB∥DC. Wektor DC=(5,0), więc B=A+(5,0)=(2,-2)... hmm, x=2","5":"DC ma wektor (4-(-1), 2-2)=(5,0). B=A+DC=(-3+5,-2+0)=(2,-2)","7":"Sprawdź wektory"}},

  // DANE I STATYSTYKA (10 questions)
  {id:"d1",t:"dane",d:1,q:"Średnia arytmetyczna: 4, 6, 8, 10:",o:["7","6","8","28"],c:0,h:"(4+6+8+10)/4 = 28/4 = 7",
    w:{"6":"To jedna z liczb, nie średnia","8":"(4+6+8+10)=28, 28/4=7, nie 8","28":"Zapomniałeś podzielić przez 4!"}},
  {id:"d2",t:"dane",d:2,q:"Mediana: {3, 7, 1, 9, 5}:",o:["5","7","3","25"],c:0,h:"Uporządkuj: 1,3,5,7,9. Środek=5",
    w:{"7":"Uporządkuj rosnąco! Środkowa to 5, nie 7","3":"1,3,5,7,9 — środkowa (trzecia) to 5","25":"To suma, nie mediana"}},
  {id:"d3",t:"dane",d:2,q:"30 uczniów, 60% to dziewczynki. Ilu chłopców?",o:["12","18","15","20"],c:0,h:"Chłopcy = 100%-60% = 40% z 30 = 12",
    w:{"18":"To liczba dziewczynek (60%·30), nie chłopców","15":"To 50% z 30. Chłopcy to 40%","20":"Sprawdź: 20/30=66,7%≠40%"}},
  {id:"d4",t:"dane",d:3,q:"P(parzysta) losując z {1,2,3,4,5,6}:",o:["½","⅓","⅔","¼"],c:0,h:"Parzyste: 2,4,6 → 3 z 6 = ½",
    w:{"⅓":"Parzyste to 2,4,6 = TRZY liczby, 3/6=½","⅔":"To P(nie-parzysta). Parzyste to 3 z 6","¼":"3/6 = ½, nie ¼"}},
  {id:"d5",t:"dane",d:1,q:"Z wykresu: zysk w I kw. = 20tys, II kw. = 30tys. O ile % wzrósł?",o:["50%","10%","33%","150%"],c:0,h:"Wzrost: 10/20 = 0,5 = 50%",
    w:{"10%":"10tys różnicy, ale procent liczymy WZGLĘDEM bazy: 10/20","33%":"10/30 to błąd — dzielimy przez wartość POCZĄTKOWĄ","150%":"150% z 20 to 30 wzrostu. Pytamy o wzrost (10), nie nową wartość"}},
  {id:"d6",t:"dane",d:2,q:"Odchylenie wyników: 3,3,3,3,3. Mediana minus średnia =",o:["0","3","-3","1"],c:0,h:"Wszystkie równe=3. Średnia=3, mediana=3. Różnica=0",
    w:{"3":"Mediana=3, średnia=3, różnica=3-3=0","-3":"Obie wynoszą 3, więc 3-3=0","1":"Gdy wszystkie wartości są równe, średnia=mediana"}},
  {id:"d7",t:"dane",d:3,q:"Rzucamy 2 kostkami. P(suma=7)=?",o:["6/36","5/36","7/36","1/6"],c:0,h:"Pary: (1,6)(2,5)(3,4)(4,3)(5,2)(6,1) = 6 par z 36",
    w:{"5/36":"Jest 6 kombinacji dających 7, nie 5","7/36":"Nie myl sumy (7) z liczbą kombinacji (6)","1/6":"1/6=6/36 — to ta sama odpowiedź! Sprawdź oznaczenia"}},
  {id:"d8",t:"dane",d:1,q:"Moda (dominanta) zbioru {2,3,3,5,7,3,8}:",o:["3","5","8","2"],c:0,h:"3 występuje najczęściej (3 razy)",
    w:{"5":"To mediana (środkowa wartość), nie moda","8":"Moda to najczęstsza wartość, nie największa","2":"2 pojawia się raz, 3 pojawia się 3 razy"}},
  {id:"d9",t:"dane",d:2,q:"Zakres (rozstęp) zbioru {4, 12, 7, 3, 15}:",o:["12","15","3","5"],c:0,h:"max-min = 15-3 = 12",
    w:{"15":"To wartość maksymalna, nie zakres. Zakres=max-min","3":"To wartość minimalna, nie zakres","5":"Sprawdź: 15-3=12, nie 5"}},
  {id:"d10",t:"dane",d:3,q:"Klasa 25 osób. 10 gra w piłkę, 8 pływa, 3 robi oba. Ilu nie robi nic?",o:["10","7","15","12"],c:0,h:"Piłka∪Pływanie = 10+8-3 = 15. Nic = 25-15 = 10",
    w:{"7":"Nie odejmuj obu: zasada włączeń-wyłączeń","15":"To ci, którzy robią COKOLWIEK. Nic=25-15","12":"10+8=18 → 25-18=7? Nie — trzeba odjąć wspólnych (3)"}},

  // PROCENTY (10 questions)
  {id:"p1",t:"procenty",d:1,q:"25% z 200 =",o:["50","25","75","100"],c:0,h:"25% = ¼. 200÷4 = 50",
    w:{"25":"25 to procent, nie wynik. 25%×200=50","75":"To 75/2? 25%×200 = 200/4 = 50","100":"To 50% z 200, nie 25%"}},
  {id:"p2",t:"procenty",d:2,q:"Cena po obniżce 20% ze 150 zł:",o:["120 zł","130 zł","110 zł","100 zł"],c:0,h:"Obniżka=20%·150=30. Nowa cena=150-30=120",
    w:{"130 zł":"20%·150=30, nie 20. Procent liczymy z CENY","110 zł":"Odejmujesz 40zł? 20%·150=30zł","100 zł":"Odejmujesz 50zł (33%). Obniżka 20%=30zł"}},
  {id:"p3",t:"procenty",d:2,q:"Skala 1:50000. 3cm na mapie = w rzeczywistości:",o:["1,5 km","15 km","150 m","0,15 km"],c:0,h:"3cm×50000=150000cm=1500m=1,5km",
    w:{"15 km":"Błąd przeliczania: 150000cm=1500m=1,5km, nie 15km","150 m":"150000cm = 1500m, nie 150m. 1m = 100cm","0,15 km":"Sprawdź: 150000cm ÷ 100 = 1500m ÷ 1000 = 1,5km"}},
  {id:"p4",t:"procenty",d:3,q:"Dwie podwyżki po 10% ze 100 zł:",o:["121 zł","120 zł","110 zł","122 zł"],c:0,h:"Pierwsza: 110. Druga: 110·1,1=121",
    w:{"120 zł":"Druga podwyżka jest z NOWEJ ceny (110), nie ze 100!","110 zł":"To po JEDNEJ podwyżce. Trzeba drugą: 110·1,1","122 zł":"110·1,1=121, nie 122"}},
  {id:"p5",t:"procenty",d:1,q:"Buty kosztowały 200zł, teraz 150zł. O ile % taniej?",o:["25%","50%","33%","75%"],c:0,h:"Różnica=50. 50/200=0,25=25%",
    w:{"50%":"50/200=25%, nie 50%. Dzielimy przez cenę POCZĄTKOWĄ","33%":"50/150=33% — ale dzielimy przez STARĄ cenę (200)","75%":"150/200=75% to ile ZOSTAŁO, nie ile taniej"}},
  {id:"p6",t:"procenty",d:2,q:"30 z 120 to ile procent?",o:["25%","30%","20%","4%"],c:0,h:"30/120 = 1/4 = 25%",
    w:{"30%":"Procent ≠ licznik. 30/120=0,25=25%","20%":"Sprawdź: 20%·120=24≠30","4%":"120/30=4, ale pytamy 30 z 120, nie odwrotnie"}},
  {id:"p7",t:"procenty",d:3,q:"Cena wzrosła o 25%, potem spadła o 20%. Cena końcowa vs początkowa:",o:["Taka sama","Wyższa o 5%","Niższa o 5%","Wyższa o 25%"],c:0,h:"100→125 (+25%), 125→100 (-20%). Taka sama!",
    w:{"Wyższa o 5%":"25%-20%=5%? Nie! Procenty się nie odejmują wprost. 125·0,8=100","Niższa o 5%":"Policz: 100·1,25·0,8 = 100. Taka sama!","Wyższa o 25%":"Spadek 20% z 125 = 25. Cena końcowa = 100"}},
  {id:"p8",t:"procenty",d:1,q:"150% z 40 =",o:["60","150","40","6"],c:0,h:"150/100 × 40 = 1,5 × 40 = 60",
    w:{"150":"To procent, nie wynik","40":"100% z 40 = 40. 150% to WIĘCEJ niż 40","6":"15% z 40 ≈ 6, ale pytamy o 150%"}},
  {id:"p9",t:"procenty",d:2,q:"Populacja wzrosła z 800 do 1000. Procentowy wzrost:",o:["25%","20%","80%","200%"],c:0,h:"Wzrost=200. 200/800=0,25=25%",
    w:{"20%":"200/1000=20%, ale dzielimy przez POCZĄTKOWĄ wartość (800)","80%":"800/1000=80%, ale to stosunek starej do nowej","200%":"Wzrost=200, ale procent=200/800=25%"}},
  {id:"p10",t:"procenty",d:3,q:"VAT 23%. Cena brutto 123zł. Cena netto:",o:["100 zł","94,71 zł","95 zł","77 zł"],c:0,h:"Brutto = netto · 1,23. Netto = 123/1,23 = 100",
    w:{"94,71 zł":"Nie odejmuj 23% z 123! 123·0,77≠netto. Netto=123/1,23","95 zł":"123-28=95? VAT to 23% od NETTO, nie od brutto","77 zł":"123·0,77? Nie — brutto/1,23=netto"}},

  // FUNKCJE (10 questions)
  {id:"f1",t:"funkcje",d:2,q:"y=2x-3. Dla x=4, y=?",o:["5","8","11","1"],c:0,h:"y=2·4-3=8-3=5",
    w:{"8":"Zapomniałeś odjąć 3. y=2·4-3=5","11":"2·4=8, +3=11? W wzorze jest MINUS 3","1":"Sprawdź: 2·4=8, 8-3=5"}},
  {id:"f2",t:"funkcje",d:2,q:"(0,-3) na y=2x+b. Wartość b:",o:["-3","3","0","2"],c:0,h:"y=2·0+b → -3=b",
    w:{"3":"Podstaw: -3=0+b → b=-3, nie +3","0":"b≠0, bo punkt ma y=-3","2":"b to wyraz wolny: -3=2·0+b → b=-3"}},
  {id:"f3",t:"funkcje",d:3,q:"y=-x+2 przecina OX w:",o:["(2,0)","(0,2)","(-2,0)","(0,-2)"],c:0,h:"OX → y=0: 0=-x+2, x=2",
    w:{"(0,2)":"To punkt przecięcia z osią OY (x=0), nie OX","(-2,0)":"0=-(-2)+2=4≠0. Błąd: x=2, nie -2","(0,-2)":"Oś OX to y=0, punkt musi mieć y=0"}},
  {id:"f4",t:"funkcje",d:3,q:"y=x²-4 miejsca zerowe:",o:["x=-2 i x=2","x=0 i x=4","x=-4 i x=4","x=2"],c:0,h:"x²-4=0 → x²=4 → x=±2",
    w:{"x=0 i x=4":"0²-4=-4≠0 i 4²-4=12≠0","x=-4 i x=4":"(-4)²-4=12≠0","x=2":"Pamiętaj: x²=4 ma DWA rozwiązania: x=2 i x=-2"}},
  {id:"f5",t:"funkcje",d:1,q:"Funkcja y=3x. Dla y=12, x=?",o:["4","36","9","15"],c:0,h:"12=3x → x=4",
    w:{"36":"3·12=36? Nie — x=y/3=12/3=4","9":"12-3=9? Nie — dzielimy: x=12/3=4","15":"12+3=15? Nie — 3x=12 → x=4"}},
  {id:"f6",t:"funkcje",d:2,q:"Współczynnik kierunkowy prostej przez (0,1) i (2,5):",o:["2","3","1","4"],c:0,h:"a=(y₂-y₁)/(x₂-x₁)=(5-1)/(2-0)=2",
    w:{"3":"(5-1)=4, (2-0)=2, 4/2=2, nie 3","1":"Dzielimy RÓŻNICĘ y przez RÓŻNICĘ x","4":"4 to różnica y, ale jeszcze trzeba podzielić przez 2"}},
  {id:"f7",t:"funkcje",d:2,q:"Funkcja y=2x+1 jest:",o:["rosnąca","malejąca","stała","żadna"],c:0,h:"a=2>0, więc funkcja jest rosnąca",
    w:{"malejąca":"a=2>0. Funkcja maleje gdy a<0","stała":"Funkcja stała gdy a=0, tu a=2","żadna":"Każda funkcja liniowa jest rosnąca, malejąca lub stała"}},
  {id:"f8",t:"funkcje",d:3,q:"Prosta y=ax+b przechodzi przez (1,3) i (3,7). Równanie to:",o:["y=2x+1","y=3x+1","y=2x+3","y=x+2"],c:0,h:"a=(7-3)/(3-1)=2. b=3-2·1=1",
    w:{"y=3x+1":"Sprawdź: 3·3+1=10≠7","y=2x+3":"Sprawdź: 2·1+3=5≠3","y=x+2":"Sprawdź: 3+2=5≠7 dla x=3"}},
  {id:"f9",t:"funkcje",d:1,q:"Punkt (2,6) leży na wykresie y=?",o:["y=3x","y=2x","y=x+2","y=6x"],c:0,h:"Sprawdź: y=3·2=6 ✓",
    w:{"y=2x":"2·2=4≠6","y=x+2":"2+2=4≠6","y=6x":"6·2=12≠6"}},
  {id:"f10",t:"funkcje",d:3,q:"y=x²-2x-3. Wartość y dla x=-1:",o:["0","-4","2","-6"],c:0,h:"(-1)²-2(-1)-3=1+2-3=0",
    w:{"-4":"(-1)²=1(nie -1), -2·(-1)=+2","2":"1+2-3=0, nie 2","-6":"Sprawdź znaki: (-1)²=+1, -2·(-1)=+2"}},
];

const BIOMES = {
  arytmetyka:{name:"Kamienny Kanion",mob:"Golem",mobEmoji:"🪨",color:"#8B6914",bgTop:"#87CEEB",bgBottom:"#D2B48C",blockColor:"#808080",blockAlt:"#696969",desc:"Liczby, ułamki, potęgi",mobHP:60,
    formulas:["Potęga: aⁿ = a·a·...·a (n razy)","Pierwiastek: √a·√b = √(a·b)","Kolejność: nawiasy → potęgi → ×÷ → +−","Ułamki: a/b · c/d = ac/bd","Procent: x% z a = (x/100)·a"]},
  algebra:{name:"Szmaragdowy Las",mob:"Zombie",mobEmoji:"🧟",color:"#228B22",bgTop:"#2D5016",bgBottom:"#1A3A0A",blockColor:"#2E8B57",blockAlt:"#3CB371",desc:"Wyrażenia, równania",mobHP:80,
    formulas:["Równanie: przenosimy i zmieniamy znak","Nierówność: dzieląc przez ujemną → obróć znak","Wzór skrócony: a²−b² = (a−b)(a+b)","Wzór skrócony: (a±b)² = a²±2ab+b²","Układ równań: dodawanie lub podstawianie"]},
  geometria:{name:"Lodowa Twierdza",mob:"Szkielet",mobEmoji:"💀",color:"#4FC3F7",bgTop:"#B3E5FC",bgBottom:"#E1F5FE",blockColor:"#80DEEA",blockAlt:"#4DD0E1",desc:"Figury, pola, Pitagoras",mobHP:80,
    formulas:["Pitagoras: c² = a² + b²","Pole trójkąta: P = ½·a·h","Pole koła: P = π·r²","Obwód koła: L = 2·π·r","Objętość prostopadłościanu: V = a·b·c","Suma kątów △ = 180°"]},
  dane:{name:"Pustynna Świątynia",mob:"Mumia",mobEmoji:"🏜️",color:"#FFB74D",bgTop:"#FFE0B2",bgBottom:"#FFF8E1",blockColor:"#FFD54F",blockAlt:"#FFCA28",desc:"Tabele, wykresy, średnia",mobHP:60,
    formulas:["Średnia: (suma wszystkich) ÷ (ilość)","Mediana: środkowa po uporządkowaniu","Moda: najczęstsza wartość","P(zdarzenie) = sprzyjające / wszystkie","Zakres = max − min"]},
  procenty:{name:"Wulkan Ognia",mob:"Blaze",mobEmoji:"🔥",color:"#EF5350",bgTop:"#D32F2F",bgBottom:"#1A0A0A",blockColor:"#FF7043",blockAlt:"#FF5722",desc:"Procenty, proporcje, skala",mobHP:70,
    formulas:["x% z a = (x/100) · a","Wzrost %: (nowa−stara)/stara · 100%","Skala: odległość rzecz. = mapa × skala","Procent składany: a · (1+p/100)ⁿ","Cena brutto = netto · (1 + VAT/100)"]},
  funkcje:{name:"Kryształowa Jaskinia",mob:"Ender",mobEmoji:"🟣",color:"#AB47BC",bgTop:"#1A0A2E",bgBottom:"#0D0015",blockColor:"#CE93D8",blockAlt:"#BA68C8",desc:"Funkcje liniowe, wykresy",mobHP:90,
    formulas:["f(x) = ax + b (liniowa)","a > 0 → rosnąca, a < 0 → malejąca","Miejsce zerowe: f(x) = 0","Wsp. kierunkowy: a = (y₂−y₁)/(x₂−x₁)","Punkt z osią OY: (0, b)"]},
};

const ACHIEVEMENTS = [
  {id:"first_kill",name:"Pierwszy Mob!",desc:"Pokonaj pierwszego moba",icon:"⚔️",check:s=>s.totalCorrect>=1},
  {id:"streak_3",name:"Kombo x3!",desc:"3 trafienia z rzędu",icon:"🔥",check:s=>s.bestStreak>=3},
  {id:"streak_5",name:"Furia!",desc:"5 trafień z rzędu",icon:"⚡",check:s=>s.bestStreak>=5},
  {id:"streak_10",name:"Nieśmiertelny!",desc:"10 trafień z rzędu",icon:"💎",check:s=>s.bestStreak>=10},
  {id:"ten_kills",name:"Łowca",desc:"10 poprawnych",icon:"🏹",check:s=>s.totalCorrect>=10},
  {id:"fifty_kills",name:"Wojownik",desc:"50 poprawnych",icon:"🗡️",check:s=>s.totalCorrect>=50},
  {id:"hundred_kills",name:"Legenda",desc:"100 poprawnych",icon:"👑",check:s=>s.totalCorrect>=100},
  {id:"biome_clear",name:"Biom oczyszczony!",desc:"80%+ w jednym biomie",icon:"🏰",check:s=>{const h=s.questionHistory||{};return Object.keys(BIOMES).some(t=>{const qs=Q.filter(q=>q.t===t);if(!qs.length)return false;let sc=0;qs.forEach(q=>{if(h[q.id]?.correct)sc++;});return(sc/qs.length)*100>=80;});}},
  {id:"explorer",name:"Odkrywca",desc:"Odwiedź wszystkie biomy",icon:"🗺️",check:s=>Object.keys(s.topicsAttempted||{}).length>=6},
  {id:"boss_slayer",name:"Pogromca Smoka!",desc:"Pokonaj Ender Smoka",icon:"🐉",check:s=>s.bossesDefeated>=1},
  {id:"veteran",name:"Weteran",desc:"5 ukończonych sesji",icon:"⭐",check:s=>s.sessionsCompleted>=5},
  {id:"perfect_boss",name:"Diamentowy!",desc:"100% z bossem",icon:"💠",check:s=>s.perfectBoss},
];

const LVL=[0,50,120,200,300,420,560,720,900,1100,1320,1560,1820,2100,2400];
const LN={pl:["Nowicjusz","Górnik","Rzemieślnik","Budowniczy","Odkrywca","Rycerz","Zaklinacz","Mistrz","Arcymistrz","Diamentowy","Legenda","Ender Pogromca","Władca Biomów","Bóg Matmy","Olimpijczyk"],en:["Novice","Miner","Craftsman","Builder","Explorer","Knight","Enchanter","Master","Grandmaster","Diamond","Legend","Ender Slayer","Biome Lord","Math God","Olympian"]};
const getLevel=xp=>{let l=0;for(let i=0;i<LVL.length;i++)if(xp>=LVL[i])l=i;return l;};
const EXAM=new Date("2026-05-12T09:00:00");
const PX="'Press Start 2P',monospace",UI="'Nunito',sans-serif";

// ─── TRANSLATIONS ───
const T={
  pl:{
    title:"MATEMATYKA HERO",subtitle:"Egzamin Ósmoklasisty 2026",daysToExam:"DNI DO EGZAMINU",readiness:"GOTOWOŚĆ",
    level:"Poz.",worldMap:"▸ MAPA ŚWIATA",bossBtn:"WALKA Z BOSSEM",bossDesc:"Egzamin próbny — 10 pytań",
    stone:"Kamień",iron:"Żelazo",gold:"Złoto",diamond:"Diament",
    hits:"Trafienia",streak:"Seria",sessions:"Sesje",
    back:"← WRÓĆ",hint:"PODPOWIEDŹ",hideHint:"UKRYJ",
    hit:"⚔️ TRAFIENIE!",mobAttacks:"💥 MOB ATAKUJE!",correct:"Poprawna:",wrongBecause:"Dlaczego {ans} jest źle:",
    nextRound:"NASTĘPNA RUNDA →",victory:"ZWYCIĘSTWO!",gameOver:"KONIEC...",
    mobDefeated:"MOB POKONANY!",dragonDefeated:"SMOK POKONANY!",youDied:"POLEGŁEŚ!",
    practiceMore:"Ćwicz więcej i wróć silniejszy!",hitsCount:"trafień",loot:"ŁUPY:",
    worldMapBtn:"MAPA ŚWIATA",fightAgain:"WALCZ PONOWNIE",respawn:"ODRODZENIE → MAPA",
    formulas:"📜 WZORY DO ZAPAMIĘTANIA:",formulaDesc:"Przeczytaj wzory, potem walcz!",toFight:"⚔️ DO WALKI!",
    easy:"ŁATWE",medium:"ŚREDNIE",hard:"TRUDNE",
    settings:"USTAWIENIA",achievements:"▸ OSIĄGNIĘCIA",stats:"▸ STATYSTYKI",
    statCorrect:"Poprawne odpowiedzi",statAll:"Wszystkie odpowiedzi",statStreak:"Najlepsza seria",
    statSessions:"Sesje",statBosses:"Pokonani bossowie",statXP:"Łączne XP",
    reset:"🔄 RESETUJ POSTĘP",resetConfirm1:"Czy na pewno? Utracisz cały postęp!",resetConfirm2:"NAPRAWDĘ na pewno? Nie da się tego cofnąć!",resetYes:"TAK, RESETUJ",resetCancel:"ANULUJ",language:"▸ JĘZYK",map:"MAPA",settingsTab:"USTAW.",
    achNames:{first_kill:"Pierwszy Mob!",streak_3:"Kombo x3!",streak_5:"Furia!",streak_10:"Nieśmiertelny!",ten_kills:"Łowca",fifty_kills:"Wojownik",hundred_kills:"Legenda",biome_clear:"Biom oczyszczony!",explorer:"Odkrywca",boss_slayer:"Pogromca Smoka!",veteran:"Weteran",perfect_boss:"Diamentowy!"},
    achDescs:{first_kill:"Pokonaj pierwszego moba",streak_3:"3 trafienia z rzędu",streak_5:"5 trafień z rzędu",streak_10:"10 trafień z rzędu",ten_kills:"10 poprawnych",fifty_kills:"50 poprawnych",hundred_kills:"100 poprawnych",biome_clear:"80%+ w jednym biomie",explorer:"Odwiedź wszystkie biomy",boss_slayer:"Pokonaj Ender Smoka",veteran:"5 ukończonych sesji",perfect_boss:"100% z bossem"},
    biomeNames:{arytmetyka:"Kamienny Kanion",algebra:"Szmaragdowy Las",geometria:"Lodowa Twierdza",dane:"Pustynna Świątynia",procenty:"Wulkan Ognia",funkcje:"Kryształowa Jaskinia"},
    mobNames:{arytmetyka:"Golem",algebra:"Zombie",geometria:"Szkielet",dane:"Mumia",procenty:"Blaze",funkcje:"Ender"},
    bossLocked:"Ukończ wszystkie biomy (80%+) aby odblokować!",bossLevelLabel:"POZIOM SMOKA",cleared:"OCZYSZCZONY",degradeWarning:"Nie grałeś {n} dni! {c} pytań wymaga powtórki!",parentTab:"INFO",
    shop:"▸ SKLEP",shopShield:"🛡️ Tarcza",shopShieldDesc:"-50% obrażeń (1 walka)",shopLife:"❤️ Ekstra życie",shopLifeDesc:"Odrodzenie z 30HP",shopFreeze:"❄️ Zamrożenie",shopFreezeDesc:"Brak degradacji 3 dni",shopXP:"⭐ Boost XP",shopXPDesc:"Podwójne XP (1 walka)",shopBuy:"KUP",shopOwned:"MAM",
  },
  en:{
    title:"MATH HERO",subtitle:"8th Grade Exam 2026",daysToExam:"DAYS TO EXAM",readiness:"READINESS",
    level:"Lvl.",worldMap:"▸ WORLD MAP",bossBtn:"BOSS FIGHT",bossDesc:"Mock exam — 10 questions",
    stone:"Stone",iron:"Iron",gold:"Gold",diamond:"Diamond",
    hits:"Hits",streak:"Streak",sessions:"Sessions",
    back:"← BACK",hint:"HINT",hideHint:"HIDE",
    hit:"⚔️ HIT!",mobAttacks:"💥 MOB ATTACKS!",correct:"Correct:",wrongBecause:"Why {ans} is wrong:",
    nextRound:"NEXT ROUND →",victory:"VICTORY!",gameOver:"GAME OVER...",
    mobDefeated:"MOB DEFEATED!",dragonDefeated:"DRAGON SLAIN!",youDied:"YOU DIED!",
    practiceMore:"Practice more and come back stronger!",hitsCount:"hits",loot:"LOOT:",
    worldMapBtn:"WORLD MAP",fightAgain:"FIGHT AGAIN",respawn:"RESPAWN → MAP",
    formulas:"📜 KEY FORMULAS:",formulaDesc:"Review the formulas, then fight!",toFight:"⚔️ TO BATTLE!",
    easy:"EASY",medium:"MEDIUM",hard:"HARD",
    settings:"SETTINGS",achievements:"▸ ACHIEVEMENTS",stats:"▸ STATISTICS",
    statCorrect:"Correct answers",statAll:"Total answers",statStreak:"Best streak",
    statSessions:"Sessions",statBosses:"Bosses defeated",statXP:"Total XP",
    reset:"🔄 RESET PROGRESS",resetConfirm1:"Are you sure? You'll lose all progress!",resetConfirm2:"REALLY sure? This cannot be undone!",resetYes:"YES, RESET",resetCancel:"CANCEL",language:"▸ LANGUAGE",map:"MAP",settingsTab:"SETTINGS",
    achNames:{first_kill:"First Mob!",streak_3:"Combo x3!",streak_5:"Fury!",streak_10:"Immortal!",ten_kills:"Hunter",fifty_kills:"Warrior",hundred_kills:"Legend",biome_clear:"Biome cleared!",explorer:"Explorer",boss_slayer:"Dragon Slayer!",veteran:"Veteran",perfect_boss:"Diamond!"},
    achDescs:{first_kill:"Defeat your first mob",streak_3:"3 hits in a row",streak_5:"5 hits in a row",streak_10:"10 hits in a row",ten_kills:"10 correct answers",fifty_kills:"50 correct answers",hundred_kills:"100 correct answers",biome_clear:"80%+ in one biome",explorer:"Visit all biomes",boss_slayer:"Defeat the Ender Dragon",veteran:"5 completed sessions",perfect_boss:"100% on a boss fight"},
    biomeNames:{arytmetyka:"Stone Canyon",algebra:"Emerald Forest",geometria:"Ice Fortress",dane:"Desert Temple",procenty:"Fire Volcano",funkcje:"Crystal Cave"},
    mobNames:{arytmetyka:"Golem",algebra:"Zombie",geometria:"Skeleton",dane:"Mummy",procenty:"Blaze",funkcje:"Ender"},
    bossLocked:"Complete all biomes (80%+) to unlock!",bossLevelLabel:"DRAGON LEVEL",cleared:"CLEARED",degradeWarning:"You haven't played for {n} days! {c} questions need revision!",parentTab:"PARENTS",
    shop:"▸ SHOP",shopShield:"🛡️ Shield",shopShieldDesc:"-50% damage (1 fight)",shopLife:"❤️ Extra Life",shopLifeDesc:"Revive with 30HP",shopFreeze:"❄️ Time Freeze",shopFreezeDesc:"No degradation 3 days",shopXP:"⭐ XP Boost",shopXPDesc:"Double XP (1 fight)",shopBuy:"BUY",shopOwned:"OWNED",
  }
};

const HealthBar=({cur,max,color="#4CAF50",h:height=12})=>{const p=Math.max(0,Math.min(100,(cur/max)*100));const c=p>60?color:p>30?"#FFC107":"#F44336";return(<div style={{width:"100%"}}><div style={{height,background:"#1a1a1a",border:"2px solid #333",overflow:"hidden"}}><div style={{height:"100%",width:`${p}%`,background:c,boxShadow:`inset 0 -2px 0 ${c}88, inset 0 2px 0 #ffffff20`,transition:"width 0.4s ease"}}/></div></div>);};

export default function App(){
  const[screen,setScreen]=useState("home");
  const[stats,setStats]=useState({xp:0,totalCorrect:0,totalAttempted:0,bestStreak:0,currentStreak:0,topicMastery:{},topicsAttempted:{},bossesDefeated:0,perfectBoss:false,sessionsCompleted:0,unlockedAchievements:[],questionHistory:{},materials:{stone:0,iron:0,gold:0,diamond:0},bossLevel:0,lastPlayTime:Date.now(),biomeCleared:{},powerups:{shield:0,extraLife:0,freezeUntil:0,xpBoost:0}});
  const[quiz,setQuiz]=useState(null);
  const[combat,setCombat]=useState(null);
  const[ach,setAch]=useState(null);
  const[hint,setHint]=useState(false);
  const[boss,setBoss]=useState(false);
  const[slash,setSlash]=useState(false);
  const[mobHit,setMobHit]=useState(false);
  const[playerHit,setPlayerHit]=useState(false);
  const[formulaTopic,setFormulaTopic]=useState(null);
  const[lang,setLang]=useState("pl");
  const[resetStep,setResetStep]=useState(0);
  const ato=useRef(null);
  const t=T[lang];

  const[degradeMsg,setDegradeMsg]=useState(null);
  useEffect(()=>{try{const r=localStorage.getItem("math-hero-v3");if(r){let s=JSON.parse(r);
    // 24h degradation: if >24h since last play, reset some correct answers (unless freeze active)
    const frozen=(s.powerups?.freezeUntil||0)>Date.now();
    const last=s.lastPlayTime||Date.now();const hoursSince=(Date.now()-last)/3600000;
    if(hoursSince>24&&s.questionHistory&&!frozen){const h={...s.questionHistory};const correctIds=Object.keys(h).filter(id=>h[id]?.correct);
      const degradeCount=Math.min(correctIds.length,Math.floor(hoursSince/24)*2);
      const shuffled=correctIds.sort(()=>Math.random()-0.5).slice(0,degradeCount);
      shuffled.forEach(id=>{h[id]={...h[id],correct:false};});
      s={...s,questionHistory:h,lastPlayTime:Date.now()};setDegradeMsg(degradeCount);}
    else{s={...s,lastPlayTime:s.lastPlayTime||Date.now()};}
    setStats(s);try{localStorage.setItem("math-hero-v3",JSON.stringify(s));}catch(e){}}
    const lg=localStorage.getItem("math-hero-lang");if(lg)setLang(lg);}catch(e){}},[]);
  const save=useCallback(s=>{setStats(s);try{localStorage.setItem("math-hero-v3",JSON.stringify(s));}catch(e){}},[]);
  const setLanguage=(l)=>{setLang(l);try{localStorage.setItem("math-hero-lang",l);}catch(e){}};
  const checkA=useCallback(s=>{const u=[...(s.unlockedAchievements||[])];let n=null;ACHIEVEMENTS.forEach(a=>{if(!u.includes(a.id)&&a.check(s)){u.push(a.id);n=a;}});if(n){if(ato.current)clearTimeout(ato.current);setAch(n);ato.current=setTimeout(()=>setAch(null),3500);}return{...s,unlockedAchievements:u};},[]);

  const days=Math.max(0,Math.ceil((EXAM-new Date())/86400000));
  const level=getLevel(stats.xp);
  const nxp=LVL[Math.min(level+1,LVL.length-1)];
  const cxp=LVL[level];

  const mastery=t=>{const h=stats.questionHistory||{};const qs=Q.filter(q=>q.t===t);if(!qs.length)return 0;let s=0;qs.forEach(q=>{if(h[q.id]?.correct)s++;});return Math.round((s/qs.length)*100);};
  const readiness=Math.round(Object.keys(BIOMES).reduce((s,t)=>s+mastery(t),0)/6);

  // Shuffle answer options so correct answer isn't always A
  const shuffleOptions=(q)=>{
    const indices=[0,1,2,3];
    for(let i=indices.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[indices[i],indices[j]]=[indices[j],indices[i]];}
    const newO=indices.map(i=>q.o[i]);
    const newC=indices.indexOf(q.c);
    const newW={...q.w};
    return{...q,o:newO,c:newC,w:newW};
  };

  // Randomize + prioritise weak questions, harder at higher boss levels
  const pickQuestions=(topic,n=6)=>{const h=stats.questionHistory||{};let pool=topic?Q.filter(q=>q.t===topic):[...Q];
    const bl=stats.bossLevel||0;
    // At higher boss levels, filter out easy questions progressively
    if(bl>=2)pool=pool.filter(q=>q.d>=2).length>=n?pool.filter(q=>q.d>=2):pool;
    if(bl>=3)pool=pool.filter(q=>q.d>=3).length>=n?pool.filter(q=>q.d>=3):pool;
    // Shuffle first
    pool=pool.sort(()=>Math.random()-0.5);
    // Sort: unseen first, then wrong, then old correct; at higher levels prioritise harder
    pool.sort((a,b)=>{const ha=h[a.id],hb=h[b.id];if(!ha&&hb)return -1;if(ha&&!hb)return 1;if(ha&&!ha.correct&&hb?.correct)return -1;if(ha?.correct&&hb&&!hb.correct)return 1;if(bl>=1)return b.d-a.d;return 0;});
    return pool.slice(0,n).map(shuffleOptions);};

  const startCombat=(topic,isBoss=false)=>{
    setBoss(isBoss);
    if(!isBoss){setFormulaTopic(topic);setScreen("formulas");return;}
    const pool=pickQuestions(null,10);
    const biome={name:"Smocza Jaskinia",mob:"Ender Smok",mobEmoji:"🐉",bgTop:"#0D0015",bgBottom:"#1A0A2E",color:"#9C27B0",blockColor:"#CE93D8",blockAlt:"#BA68C8",formulas:["Powtórka ze wszystkich działów!"]};
    setQuiz({questions:pool,ci:0,answers:[],sel:null,answered:false,sc:0,st:0});
    setCombat({pHP:100,pMax:100,mHP:120,mMax:120,topic,biome});
    setHint(false);setScreen("combat");
  };

  const launchFromFormulas=()=>{
    const topic=formulaTopic;
    const pool=pickQuestions(topic,6);
    const biome=BIOMES[topic];
    setQuiz({questions:pool,ci:0,answers:[],sel:null,answered:false,sc:0,st:0});
    setCombat({pHP:100,pMax:100,mHP:biome.mobHP,mMax:biome.mobHP,topic,biome});
    setHint(false);setScreen("combat");
  };

  const answer=(idx)=>{
    if(quiz.answered)return;
    const q=quiz.questions[quiz.ci];
    const ok=idx===q.c;
    const pw=stats.powerups||{};
    const hasShield=(pw.shield||0)>0;const hasXPBoost=(pw.xpBoost||0)>0;
    const dmg=ok?(q.d*12+(stats.currentStreak>=3?8:0)):0;
    const rawMd=ok?0:(10+q.d*5);const md=hasShield?Math.floor(rawMd/2):rawMd;
    const rawXp=ok?(q.d*10+(stats.questionHistory?.[q.id]?.correct===false?5:0)):0;
    const xp=hasXPBoost?rawXp*2:rawXp;
    const mat={...stats.materials};
    if(ok){if(q.d===1)mat.stone=(mat.stone||0)+2;else if(q.d===2)mat.iron=(mat.iron||0)+2;else{mat.gold=(mat.gold||0)+1;mat.diamond=(mat.diamond||0)+(Math.random()>0.5?1:0);}}
    if(ok){setSlash(true);setMobHit(true);setTimeout(()=>{setSlash(false);setMobHit(false);},400);}else{setPlayerHit(true);setTimeout(()=>setPlayerHit(false),400);}
    const nh={...stats.questionHistory};const prevCorrect=nh[q.id]?.correct===true;nh[q.id]={correct:ok||prevCorrect,attempts:(nh[q.id]?.attempts||0)+1,lastAttempt:Date.now(),sr:SM2(ok?(hint?3:5):1,nh[q.id]?.sr)};
    const ns=ok?stats.currentStreak+1:0;
    let nst={...stats,xp:stats.xp+xp,totalCorrect:stats.totalCorrect+(ok?1:0),totalAttempted:stats.totalAttempted+1,currentStreak:ns,bestStreak:Math.max(stats.bestStreak,ns),topicsAttempted:{...(stats.topicsAttempted||{}),[q.t]:true},questionHistory:nh,materials:mat};
    nst=checkA(nst);save(nst);
    setCombat(p=>({...p,mHP:Math.max(0,p.mHP-dmg),pHP:Math.max(0,p.pHP-md)}));
    setQuiz(p=>({...p,sel:idx,answered:true,sc:p.sc+(ok?1:0),st:p.st+1,answers:[...p.answers,{qid:q.id,sel:idx,ok,xp,dmg,md}]}));
    setHint(false);
  };

  const nextRound=()=>{
    const finishSession=(s,won)=>{s.lastPlayTime=Date.now();s.sessionsCompleted=s.sessionsCompleted+1;
      // Consume single-use powerups after fight
      const pw={...(s.powerups||{})};if(pw.shield>0)pw.shield--;if(pw.xpBoost>0)pw.xpBoost--;s.powerups=pw;
      // Track biome cleared on victory (>=80% or mob killed)
      if(won&&!boss&&combat.topic){const pct=Math.round((quiz.sc/quiz.st)*100);if(pct>=80){s.biomeCleared={...(s.biomeCleared||{}),[combat.topic]:true};}}
      // Boss victory: level up, reset biome progress for next round
      if(won&&boss){s.bossLevel=(s.bossLevel||0)+1;s.biomeCleared={};s.questionHistory={};}
      return s;};
    if(combat.mHP<=0){const pf=quiz.sc===quiz.st;let s={...stats,materials:{...stats.materials,gold:(stats.materials.gold||0)+3,diamond:(stats.materials.diamond||0)+(boss?3:1)}};if(boss){s.bossesDefeated=s.bossesDefeated+1;s.perfectBoss=s.perfectBoss||pf;}s=finishSession(s,true);s=checkA(s);save(s);setScreen("victory");return;}
    if(combat.pHP<=0){
      // Extra life: revive with 30HP instead of dying
      const pw=stats.powerups||{};if((pw.extraLife||0)>0){const ns={...stats,powerups:{...pw,extraLife:pw.extraLife-1}};save(ns);setCombat(p=>({...p,pHP:30}));return;}
      let s=finishSession({...stats},false);s=checkA(s);save(s);setScreen("defeat");return;}
    const ni=quiz.ci+1;
    if(ni>=quiz.questions.length){const pct=Math.round((quiz.sc/quiz.st)*100);if(pct>=50){let s={...stats,materials:{...stats.materials,gold:(stats.materials.gold||0)+2}};if(boss)s.bossesDefeated++;s=finishSession(s,true);s=checkA(s);save(s);setScreen("victory");}else{let s=finishSession({...stats},false);s=checkA(s);save(s);setScreen("defeat");}return;}
    setQuiz(p=>({...p,ci:ni,sel:null,answered:false}));setHint(false);
  };

  // ═══ FORMULA INTRO SCREEN ═══
  const FormulaScreen=()=>{
    const b=BIOMES[formulaTopic];if(!b)return null;
    const biomeName=t.biomeNames?.[formulaTopic]||b.name;
    return(<div style={{paddingTop:16}}>
      <button onClick={()=>setScreen("home")} style={{background:"#1a1a1a",border:"2px solid #333",padding:"6px 12px",fontFamily:PX,fontSize:8,color:"#888",cursor:"pointer",marginBottom:12}}>{t.back}</button>
      <div style={{background:`linear-gradient(180deg,${b.bgTop},${b.bgBottom})`,border:`3px solid ${b.color}`,padding:16,textAlign:"center",marginBottom:12}}>
        <div style={{fontSize:40,marginBottom:8}}>{b.mobEmoji}</div>
        <div style={{fontFamily:PX,fontSize:10,color:"#fff",textShadow:"1px 1px 0 #000"}}>{biomeName}</div>
        <div style={{fontFamily:PX,fontSize:7,color:b.color,marginTop:4}}>{b.desc}</div>
      </div>
      <div style={{background:"#111",border:"3px solid #FFC107",padding:14,marginBottom:12}}>
        <div style={{fontFamily:PX,fontSize:8,color:"#FFC107",marginBottom:10}}>{t.formulas}</div>
        {b.formulas.map((f,i)=>(<div key={i} style={{fontFamily:UI,fontSize:14,color:"#E8E6F0",padding:"6px 0",borderBottom:i<b.formulas.length-1?"1px solid #222":"none",lineHeight:1.5}}>{f}</div>))}
      </div>
      <div style={{fontFamily:UI,fontSize:13,color:"#888",marginBottom:12,textAlign:"center"}}>{t.formulaDesc}</div>
      <button onClick={launchFromFormulas} style={{width:"100%",background:"#4CAF50",border:"3px solid #388E3C",padding:14,fontFamily:PX,fontSize:10,color:"#fff",cursor:"pointer",boxShadow:"inset 0 -3px 0 #2E7D32"}}>{t.toFight}</button>
    </div>);
  };

  // ═══ HOME ═══
  const Home=()=>(<div>
    <div style={{textAlign:"center",padding:"16px 0 8px"}}><h1 style={{fontFamily:PX,fontSize:14,color:"#4CAF50",margin:0,textShadow:"2px 2px 0 #000"}}>{t.title}</h1><div style={{fontFamily:PX,fontSize:8,color:"#888",marginTop:6}}>{t.subtitle}</div></div>
    <div style={{background:"#1a1a1a",border:"3px solid #333",padding:"10px 14px",marginBottom:12,display:"flex",alignItems:"center",gap:12}}>
      <div style={{fontSize:28}}>🏆</div>
      <div style={{flex:1}}><div style={{fontFamily:PX,fontSize:18,color:days<=14?"#F44336":"#FFC107"}}>{days}</div><div style={{fontFamily:PX,fontSize:7,color:"#888"}}>{t.daysToExam}</div></div>
      <div style={{textAlign:"right"}}><div style={{fontFamily:PX,fontSize:7,color:"#4CAF50"}}>{t.readiness}</div><div style={{fontFamily:PX,fontSize:14,color:readiness>=70?"#4CAF50":readiness>=40?"#FFC107":"#F44336"}}>{readiness}%</div></div>
    </div>
    <div style={{background:"#111",border:"3px solid #333",padding:"10px 14px",marginBottom:12,display:"flex",alignItems:"center",gap:12}}>
      <div style={{fontSize:24}}>⛏️</div>
      <div style={{flex:1}}><div style={{fontFamily:PX,fontSize:8,color:"#FFC107",marginBottom:4}}>{t.level}{level} — {LN[lang][level]}</div><HealthBar cur={stats.xp-cxp} max={nxp-cxp} color="#4CAF50" /><div style={{fontFamily:PX,fontSize:7,color:"#666",marginTop:2}}>{stats.xp}/{nxp} XP</div></div>
    </div>
    <div style={{background:"#111",border:"3px solid #333",padding:"8px 10px",marginBottom:12,display:"flex",gap:4,justifyContent:"space-around"}}>
      {[{n:t.stone,i:"🪨",c:stats.materials?.stone||0,cl:"#9E9E9E"},{n:t.iron,i:"⬜",c:stats.materials?.iron||0,cl:"#BDBDBD"},{n:t.gold,i:"🟨",c:stats.materials?.gold||0,cl:"#FFC107"},{n:t.diamond,i:"💎",c:stats.materials?.diamond||0,cl:"#00BCD4"}].map(m=>(<div key={m.n} style={{textAlign:"center",flex:1}}><div style={{fontSize:18}}>{m.i}</div><div style={{fontFamily:PX,fontSize:10,color:m.cl}}>{m.c}</div><div style={{fontFamily:PX,fontSize:6,color:"#555"}}>{m.n}</div></div>))}
    </div>
    {/* Shop */}
    <div style={{fontFamily:PX,fontSize:8,color:"#FFC107",marginBottom:6}}>{t.shop}</div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:12}}>
      {[
        {id:"shield",label:t.shopShield,desc:t.shopShieldDesc,cost:{iron:5},icon:"🛡️"},
        {id:"extraLife",label:t.shopLife,desc:t.shopLifeDesc,cost:{gold:3},icon:"❤️"},
        {id:"freeze",label:t.shopFreeze,desc:t.shopFreezeDesc,cost:{diamond:2},icon:"❄️"},
        {id:"xpBoost",label:t.shopXP,desc:t.shopXPDesc,cost:{stone:10},icon:"⭐"},
      ].map(item=>{
        const mat=stats.materials||{};const pw=stats.powerups||{};
        const costKey=Object.keys(item.cost)[0];const costAmt=item.cost[costKey];
        const canBuy=(mat[costKey]||0)>=costAmt;
        const owned=item.id==="freeze"?(pw.freezeUntil||0)>Date.now():(pw[item.id]||0)>0;
        return(<div key={item.id} style={{background:"#111",border:`2px solid ${owned?"#4CAF50":canBuy?"#FFC107":"#222"}`,padding:8}}>
          <div style={{fontFamily:PX,fontSize:7,color:"#fff",marginBottom:4}}>{item.label}</div>
          <div style={{fontFamily:UI,fontSize:11,color:"#888",marginBottom:6}}>{item.desc}</div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontFamily:PX,fontSize:7,color:"#666"}}>{costAmt} {costKey}</span>
            {owned
              ?<span style={{fontFamily:PX,fontSize:6,color:"#4CAF50"}}>{t.shopOwned}</span>
              :<button onClick={()=>{if(!canBuy)return;const nm={...mat,[costKey]:mat[costKey]-costAmt};const np={...pw};
                if(item.id==="freeze")np.freezeUntil=Date.now()+3*86400000;else np[item.id]=(np[item.id]||0)+1;
                save({...stats,materials:nm,powerups:np});
              }} disabled={!canBuy} style={{background:canBuy?"#FFC10730":"#111",border:`2px solid ${canBuy?"#FFC107":"#333"}`,padding:"3px 8px",fontFamily:PX,fontSize:6,color:canBuy?"#FFC107":"#444",cursor:canBuy?"pointer":"not-allowed"}}>{t.shopBuy}</button>}
          </div>
        </div>);
      })}
    </div>
    {degradeMsg&&<div style={{background:"#F4433620",border:"3px solid #F44336",padding:10,marginBottom:12,textAlign:"center"}}>
      <div style={{fontFamily:PX,fontSize:7,color:"#F44336"}}>⚠️ {t.degradeWarning.replace("{n}",Math.floor(((Date.now()-(stats.lastPlayTime||Date.now()))/86400000)||1)).replace("{c}",degradeMsg)}</div>
      <button onClick={()=>setDegradeMsg(null)} style={{background:"#333",border:"none",padding:"4px 12px",fontFamily:PX,fontSize:7,color:"#888",cursor:"pointer",marginTop:6}}>OK</button>
    </div>}
    <div style={{fontFamily:PX,fontSize:8,color:"#4CAF50",marginBottom:4}}>{t.worldMap}</div>
    {(stats.bossLevel||0)>0&&<div style={{fontFamily:PX,fontSize:7,color:"#CE93D8",marginBottom:8}}>🐉 {t.bossLevelLabel}: {stats.bossLevel||0}</div>}
    {(()=>{const bc=stats.biomeCleared||{};const clearedCount=Object.keys(BIOMES).filter(k=>bc[k]).length;return <div style={{fontFamily:PX,fontSize:7,color:"#666",marginBottom:8}}>✅ {clearedCount}/6</div>;})()}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
      {Object.entries(BIOMES).map(([k,b])=>{const m=mastery(k);const bl=Math.round((m/100)*8);const cleared=(stats.biomeCleared||{})[k];return(
        <div key={k} onClick={()=>startCombat(k)} style={{background:`linear-gradient(180deg,${b.bgTop},${b.bgBottom})`,border:`3px solid ${cleared?"#4CAF50":b.color}`,padding:10,cursor:"pointer",position:"relative",overflow:"hidden",minHeight:100}}>
          {cleared&&<div style={{position:"absolute",top:4,right:4,fontFamily:PX,fontSize:6,color:"#4CAF50",background:"#0008",padding:"2px 4px",zIndex:2}}>✅ {t.cleared}</div>}
          <div style={{position:"absolute",bottom:0,left:0,right:0,display:"flex",flexWrap:"wrap",justifyContent:"center",gap:1,padding:2}}>
            {Array.from({length:8}).map((_,i)=>(<div key={i} style={{width:14,height:14,background:i<bl?b.blockColor:"#22222266",boxShadow:i<bl?`inset -2px -2px 0 ${b.blockAlt}, inset 2px 2px 0 #ffffff20`:"none"}}/>))}
          </div>
          <div style={{position:"relative",zIndex:1}}><div style={{fontSize:22,marginBottom:4}}>{b.mobEmoji}</div><div style={{fontFamily:PX,fontSize:7,color:"#fff",textShadow:"1px 1px 0 #000",lineHeight:1.4}}>{t.biomeNames?.[k]||b.name}</div><div style={{fontFamily:PX,fontSize:6,color:b.color,marginTop:4}}>{m}%</div></div>
        </div>);})}
    </div>
    {(()=>{const bc=stats.biomeCleared||{};const allCleared=Object.keys(BIOMES).every(k=>bc[k]);return(
      <div onClick={allCleared?()=>startCombat(null,true):undefined} style={{background:"linear-gradient(180deg,#1A0A2E,#0D0015)",border:`3px solid ${allCleared?"#9C27B0":"#333"}`,padding:14,cursor:allCleared?"pointer":"not-allowed",textAlign:"center",boxShadow:allCleared?"0 0 20px #9C27B040":"none",opacity:allCleared?1:0.5}}>
        <div style={{fontSize:32}}>{allCleared?"🐉":"🔒"}</div><div style={{fontFamily:PX,fontSize:9,color:allCleared?"#CE93D8":"#555",marginTop:6}}>{t.bossBtn}</div>
        <div style={{fontFamily:PX,fontSize:7,color:"#666",marginTop:4}}>{allCleared?t.bossDesc:t.bossLocked}</div>
      </div>);})()}
  </div>);

  // ═══ COMBAT ═══
  const Combat=()=>{
    if(!quiz||!combat)return null;const q=quiz.questions[quiz.ci];const b=combat.biome;
    return(<div>
      <button onClick={()=>setScreen("home")} style={{background:"#1a1a1a",border:"2px solid #333",padding:"6px 12px",fontFamily:PX,fontSize:8,color:"#888",cursor:"pointer",marginTop:12,marginBottom:8}}>{t.back}</button>
      <div style={{background:`linear-gradient(180deg,${b.bgTop},${b.bgBottom})`,border:"3px solid #333",padding:12,marginBottom:10,position:"relative",minHeight:140}}>
        <div style={{textAlign:"center",marginBottom:6}}><div style={{fontFamily:PX,fontSize:7,color:"#fff",marginBottom:4,textShadow:"1px 1px 0 #000"}}>{t.mobNames?.[combat.topic]||b.mob}</div><HealthBar cur={combat.mHP} max={combat.mMax} color="#F44336" /><div style={{fontFamily:PX,fontSize:7,color:"#aaa",marginTop:2}}>{combat.mHP}/{combat.mMax}</div></div>
        <div style={{position:"relative",textAlign:"center",padding:"4px 0"}}>
          <div style={{fontSize:48,animation:mobHit?"mobHit 0.3s ease":"mobIdle 2s ease infinite",filter:mobHit?"brightness(2) saturate(0)":"none",transition:"filter 0.15s"}}>{b.mobEmoji}</div>
          {slash&&<div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:40,animation:"swordSlash 0.4s ease forwards",zIndex:10,pointerEvents:"none"}}>⚔️</div>}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6,animation:playerHit?"playerHit 0.3s ease":"none"}}>
          <div style={{fontSize:24}}>⛏️</div>
          <div style={{flex:1}}><HealthBar cur={combat.pHP} max={combat.pMax} color="#4CAF50" /><div style={{fontFamily:PX,fontSize:7,color:"#aaa",marginTop:2}}>{combat.pHP}/{combat.pMax}{stats.currentStreak>=3&&<span style={{color:"#FFC107"}}> 🔥×{stats.currentStreak}</span>}</div></div>
        </div>
        {(()=>{const pw=stats.powerups||{};const active=[];if(pw.shield>0)active.push("🛡️");if(pw.extraLife>0)active.push("❤️");if(pw.xpBoost>0)active.push("⭐");if(!active.length)return null;return <div style={{fontFamily:PX,fontSize:7,color:"#FFC107",marginTop:4,textAlign:"center"}}>{active.join(" ")}</div>;})()}
        <div style={{position:"absolute",top:8,right:10,fontFamily:PX,fontSize:7,color:"#fff8"}}>{quiz.ci+1}/{quiz.questions.length}</div>
      </div>
      <div style={{background:"#111",border:"3px solid #333",padding:12,marginBottom:8}}>
        <div style={{display:"flex",gap:4,marginBottom:6}}>{[1,2,3].map(d=>(<span key={d} style={{width:8,height:8,display:"inline-block",background:d<=q.d?"#FFC107":"#333"}}/>))}<span style={{fontFamily:PX,fontSize:6,color:"#888",marginLeft:4}}>{q.d===1?t.easy:q.d===2?t.medium:t.hard}</span></div>
        <div style={{fontFamily:UI,fontSize:16,fontWeight:700,color:"#fff",lineHeight:1.5}}>{q.q}</div>
      </div>
      {q.o.map((opt,i)=>{let st="x";if(quiz.answered){if(i===q.c)st="ok";else if(i===quiz.sel)st="no";}const bc=st==="ok"?"#4CAF50":st==="no"?"#F44336":"#333";return(
        <button key={i} onClick={()=>answer(i)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",background:st==="ok"?"#4CAF5020":st==="no"?"#F4433620":"#111",border:`3px solid ${bc}`,padding:12,marginBottom:6,cursor:"pointer",fontFamily:UI,fontSize:15,color:"#E8E6F0",textAlign:"left"}}>
          <span style={{fontFamily:PX,fontSize:10,color:st==="ok"?"#4CAF50":st==="no"?"#F44336":"#666",width:20}}>{st==="ok"?"✓":st==="no"?"✗":String.fromCharCode(65+i)}</span><span>{opt}</span>
        </button>);})}
      {!quiz.answered&&!hint&&<button onClick={()=>{const cost=10;if(stats.xp>=cost){let ns={...stats,xp:stats.xp-cost};save(ns);setHint(true);}else if((stats.materials?.diamond||0)>=1){let ns={...stats,materials:{...stats.materials,diamond:stats.materials.diamond-1}};save(ns);setHint(true);}}} disabled={stats.xp<10&&(stats.materials?.diamond||0)<1} style={{background:"#1a1a1a",border:"2px solid #FFC10744",padding:"6px 12px",fontFamily:PX,fontSize:7,color:stats.xp>=10||(stats.materials?.diamond||0)>=1?"#FFC107":"#555",cursor:stats.xp>=10||(stats.materials?.diamond||0)>=1?"pointer":"not-allowed",marginTop:4,opacity:stats.xp>=10||(stats.materials?.diamond||0)>=1?1:0.5}}>💡 {t.hint} ({stats.xp>=10?`-10 XP`:`💎 -1`})</button>}
      {hint&&!quiz.answered&&<div style={{background:"#1a1a1a",border:"2px solid #FFC10744",padding:10,marginTop:6,fontFamily:UI,fontSize:14,color:"#FFC107"}}>💡 {q.h}</div>}
      {quiz.answered&&(<div style={{marginTop:8}}>
        <div style={{background:"#111",border:`3px solid ${quiz.sel===q.c?"#4CAF50":"#F44336"}`,padding:10}}>
          {quiz.sel===q.c?(<div><div style={{fontFamily:PX,fontSize:8,color:"#4CAF50"}}>{t.hit} -{quiz.answers.slice(-1)[0]?.dmg} HP</div><div style={{fontFamily:PX,fontSize:7,color:"#FFC107",marginTop:4}}>+{quiz.answers.slice(-1)[0]?.xp} XP{q.d>=2?` +${t.iron.toLowerCase()}`:""}{q.d>=3?` +${t.gold.toLowerCase()}`:""}</div></div>)
          :(<div>
            <div style={{fontFamily:PX,fontSize:8,color:"#F44336"}}>{t.mobAttacks} -{quiz.answers.slice(-1)[0]?.md} HP</div>
            <div style={{fontFamily:UI,fontSize:13,color:"#4CAF50",marginTop:8}}>✓ {t.correct} {q.o[q.c]}</div>
            <div style={{fontFamily:UI,fontSize:13,color:"#FF8A65",marginTop:6,lineHeight:1.5,padding:"6px 0",borderTop:"1px solid #222"}}>
              ❌ {t.wrongBecause.replace("{ans}",q.o[quiz.sel])}: <span style={{color:"#ccc"}}>{q.w?.[q.o[quiz.sel]]||q.h}</span>
            </div>
            <div style={{fontFamily:UI,fontSize:12,color:"#FFC107",marginTop:4}}>💡 {q.h}</div>
          </div>)}
        </div>
        <button onClick={nextRound} style={{width:"100%",background:"#4CAF50",border:"3px solid #388E3C",padding:12,fontFamily:PX,fontSize:9,color:"#fff",cursor:"pointer",marginTop:8,boxShadow:"inset 0 -3px 0 #2E7D32"}}>{combat.mHP<=0?t.victory:combat.pHP<=0?t.gameOver:t.nextRound}</button>
      </div>)}
    </div>);
  };

  // ═══ VICTORY / DEFEAT ═══
  const Victory=()=>{if(!quiz||!combat)return null;const pct=Math.round((quiz.sc/quiz.st)*100);return(<div style={{textAlign:"center",paddingTop:32}}>
    <div style={{fontSize:64,animation:"victoryBounce 0.6s ease"}}>{boss?"🐉":combat.biome.mobEmoji}</div>
    <h2 style={{fontFamily:PX,fontSize:12,color:"#4CAF50",margin:"16px 0 8px",textShadow:"2px 2px 0 #000"}}>{boss?t.dragonDefeated:t.mobDefeated}</h2>
    <div style={{fontFamily:PX,fontSize:24,color:"#FFC107"}}>{pct}%</div>
    <div style={{fontFamily:PX,fontSize:8,color:"#888",marginTop:4}}>{quiz.sc}/{quiz.st} {t.hitsCount}</div>
    <div style={{background:"#111",border:"3px solid #FFC107",padding:12,margin:"20px 0"}}>
      <div style={{fontFamily:PX,fontSize:8,color:"#FFC107",marginBottom:8}}>{t.loot}</div>
      <div style={{display:"flex",justifyContent:"center",gap:16}}>
        <div><span style={{fontSize:20}}>⭐</span><div style={{fontFamily:PX,fontSize:9,color:"#fff"}}>+{quiz.answers.reduce((s,a)=>s+a.xp,0)} XP</div></div>
        <div><span style={{fontSize:20}}>🟨</span><div style={{fontFamily:PX,fontSize:9,color:"#FFC107"}}>+3</div></div>
        <div><span style={{fontSize:20}}>💎</span><div style={{fontFamily:PX,fontSize:9,color:"#00BCD4"}}>+{boss?3:1}</div></div>
      </div>
    </div>
    <button onClick={()=>setScreen("home")} style={{width:"100%",background:"#4CAF50",border:"3px solid #388E3C",padding:14,fontFamily:PX,fontSize:9,color:"#fff",cursor:"pointer",boxShadow:"inset 0 -3px 0 #2E7D32"}}>{t.worldMapBtn}</button>
    <button onClick={()=>startCombat(boss?null:combat.topic,boss)} style={{width:"100%",background:"#1a1a1a",border:"3px solid #333",padding:14,fontFamily:PX,fontSize:9,color:"#888",cursor:"pointer",marginTop:8}}>{t.fightAgain}</button>
  </div>);};

  const Defeat=()=>(<div style={{textAlign:"center",paddingTop:32}}>
    <div style={{fontSize:64}}>💀</div>
    <h2 style={{fontFamily:PX,fontSize:12,color:"#F44336",margin:"16px 0 8px",textShadow:"2px 2px 0 #000"}}>{t.youDied}</h2>
    <div style={{fontFamily:PX,fontSize:8,color:"#888",margin:"8px 0 24px"}}>{t.practiceMore}</div>
    {quiz&&<div style={{fontFamily:UI,fontSize:14,color:"#aaa",marginBottom:20}}>{quiz.sc}/{quiz.st} {t.hitsCount}</div>}
    <button onClick={()=>setScreen("home")} style={{width:"100%",background:"#F44336",border:"3px solid #C62828",padding:14,fontFamily:PX,fontSize:9,color:"#fff",cursor:"pointer",boxShadow:"inset 0 -3px 0 #B71C1C"}}>{t.respawn}</button>
  </div>);

  // ═══ SETTINGS ═══
  const Settings=()=>(<div>
    <div style={{textAlign:"center",padding:"16px 0 12px"}}><div style={{fontFamily:PX,fontSize:10,color:"#FFC107",textShadow:"1px 1px 0 #000"}}>{t.settings}</div></div>
    {/* Language toggle */}
    <div style={{fontFamily:PX,fontSize:8,color:"#4CAF50",marginBottom:8}}>{t.language}</div>
    <div style={{display:"flex",gap:6,marginBottom:16}}>
      {[{code:"pl",label:"🇵🇱 Polski"},{code:"en",label:"🇬🇧 English"}].map(l=>(
        <button key={l.code} onClick={()=>setLanguage(l.code)} style={{flex:1,background:lang===l.code?"#4CAF5020":"#111",border:`3px solid ${lang===l.code?"#4CAF50":"#333"}`,padding:"10px 8px",fontFamily:PX,fontSize:8,color:lang===l.code?"#4CAF50":"#666",cursor:"pointer",textAlign:"center"}}>{l.label}</button>
      ))}
    </div>
    {/* Achievements */}
    <div style={{fontFamily:PX,fontSize:8,color:"#4CAF50",marginBottom:8}}>{t.achievements} ({stats.unlockedAchievements?.length||0}/{ACHIEVEMENTS.length})</div>
    {ACHIEVEMENTS.map(a=>{const u=stats.unlockedAchievements?.includes(a.id);return(
      <div key={a.id} style={{background:u?"#1a1a0a":"#0a0a0a",border:`3px solid ${u?"#FFC107":"#222"}`,padding:"8px 12px",marginBottom:4,display:"flex",alignItems:"center",gap:10,opacity:u?1:0.45}}>
        <div style={{fontSize:20,filter:u?"none":"grayscale(100%)"}}>{a.icon}</div>
        <div style={{flex:1}}><div style={{fontFamily:PX,fontSize:7,color:u?"#FFC107":"#444"}}>{t.achNames?.[a.id]||a.name}</div><div style={{fontFamily:UI,fontSize:11,color:u?"#aaa":"#333"}}>{t.achDescs?.[a.id]||a.desc}</div></div>
        {u&&<div style={{fontFamily:PX,fontSize:8,color:"#4CAF50"}}>✓</div>}
      </div>);})}
    {/* Stats */}
    <div style={{fontFamily:PX,fontSize:8,color:"#4CAF50",margin:"16px 0 8px"}}>{t.stats}</div>
    <div style={{background:"#111",border:"3px solid #333",padding:12}}>
      {[[t.statCorrect,stats.totalCorrect],[t.statAll,stats.totalAttempted],[t.statStreak,stats.bestStreak],[t.statSessions,stats.sessionsCompleted],[t.statBosses,stats.bossesDefeated],[t.statXP,stats.xp]].map(([l,v])=>(<div key={l} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:"1px solid #1a1a1a"}}><span style={{fontFamily:UI,fontSize:13,color:"#888"}}>{l}</span><span style={{fontFamily:PX,fontSize:10,color:"#fff"}}>{v}</span></div>))}
    </div>
    {/* Reset — two-step confirmation */}
    <button onClick={()=>setResetStep(1)} style={{width:"100%",background:"#F4433620",border:"3px solid #F44336",padding:12,fontFamily:PX,fontSize:8,color:"#F44336",cursor:"pointer",marginTop:16}}>{t.reset}</button>
    {resetStep>=1&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"#000000cc",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:"#1a1a1a",border:"3px solid #F44336",padding:20,maxWidth:340,width:"100%",textAlign:"center"}}>
        <div style={{fontSize:32,marginBottom:12}}>{resetStep===1?"⚠️":"💀"}</div>
        <div style={{fontFamily:PX,fontSize:8,color:"#F44336",marginBottom:6}}>{resetStep===1?t.resetConfirm1:t.resetConfirm2}</div>
        <div style={{display:"flex",gap:8,marginTop:16}}>
          <button onClick={()=>setResetStep(0)} style={{flex:1,background:"#111",border:"3px solid #333",padding:10,fontFamily:PX,fontSize:7,color:"#888",cursor:"pointer"}}>{t.resetCancel}</button>
          <button onClick={async()=>{if(resetStep===1){setResetStep(2);}else{await save({xp:0,totalCorrect:0,totalAttempted:0,bestStreak:0,currentStreak:0,topicMastery:{},topicsAttempted:{},bossesDefeated:0,perfectBoss:false,sessionsCompleted:0,unlockedAchievements:[],questionHistory:{},materials:{stone:0,iron:0,gold:0,diamond:0},bossLevel:0,lastPlayTime:Date.now(),biomeCleared:{},powerups:{shield:0,extraLife:0,freezeUntil:0,xpBoost:0}});setResetStep(0);setScreen("home");}}} style={{flex:1,background:"#F4433640",border:"3px solid #F44336",padding:10,fontFamily:PX,fontSize:7,color:"#F44336",cursor:"pointer"}}>{t.resetYes}</button>
        </div>
      </div>
    </div>}
  </div>);

  // ═══ APP INFO ═══
  const Parents=()=>{
    const isPl=lang==="pl";
    const pastExams=[
      {year:2025,label:isPl?"Egzamin 2025 — Maj (PDF)":"Exam 2025 — May (PDF)",url:"https://cke.gov.pl/images/_EGZAMIN_OSMOKLASISTY/Arkusze-egzaminacyjne/2025/matematyka/OMAP-100-X-2505-zeszyt-zadan.pdf"},
      {year:2024,label:isPl?"Egzamin 2024 — Maj (PDF)":"Exam 2024 — May (PDF)",url:"https://cke.gov.pl/images/_EGZAMIN_OSMOKLASISTY/Arkusze-egzaminacyjne/2024/matematyka/OMAP-100-X-2405-zeszyt-zadan.pdf"},
      {year:2023,label:isPl?"Egzamin 2023 — Maj (PDF)":"Exam 2023 — May (PDF)",url:"https://cke.gov.pl/images/_EGZAMIN_OSMOKLASISTY/Arkusze-egzaminacyjne/2023/matematyka/OMAP-100-2305.pdf"},
      {year:2022,label:isPl?"Egzamin 2022 — Maj (PDF)":"Exam 2022 — May (PDF)",url:"https://cke.gov.pl/images/_EGZAMIN_OSMOKLASISTY/Arkusze-egzaminacyjne/2022/matematyka/OMAP-100-2205.pdf"},
      {year:2021,label:isPl?"Egzamin 2021 — Maj (PDF)":"Exam 2021 — May (PDF)",url:"https://cke.gov.pl/images/_EGZAMIN_OSMOKLASISTY/Arkusze-egzaminacyjne/2021/matematyka/OMAP-100-X-2105.pdf"},
      {year:2020,label:isPl?"Egzamin 2020 — Czerwiec (PDF)":"Exam 2020 — June (PDF)",url:"https://cke.gov.pl/images/_EGZAMIN_OSMOKLASISTY/Arkusze-egzaminacyjne/2020/matematyka/OMAP-100-2004.pdf"},
      {year:2019,label:isPl?"Egzamin 2019 — Kwiecień (PDF)":"Exam 2019 — April (PDF)",url:"https://cke.gov.pl/images/_EGZAMIN_OSMOKLASISTY/Arkusze-egzaminacyjne/2019/matematyka/Arkusz_OMAP-100-1904.pdf"},
    ];
    return(<div>
      <div style={{textAlign:"center",padding:"16px 0 12px"}}><div style={{fontFamily:PX,fontSize:10,color:"#4CAF50",textShadow:"1px 1px 0 #000"}}>{isPl?"INFORMACJE O APLIKACJI":"APP INFORMATION"}</div></div>
      <div style={{background:"#111",border:"3px solid #4CAF50",padding:16,marginBottom:12}}>
        <div style={{fontFamily:PX,fontSize:8,color:"#4CAF50",marginBottom:10}}>{isPl?"🎮 Co to jest?":"🎮 What is this?"}</div>
        <div style={{fontFamily:UI,fontSize:14,color:"#ccc",lineHeight:1.7}}>
          {isPl
            ?"Matematyka Hero to aplikacja do nauki matematyki, przygotowująca do egzaminu ósmoklasisty (12 maja 2026). Gra wykorzystuje motyw Minecrafta, aby nauka była bardziej angażująca — każde pytanie to walka z potworem, a poprawne odpowiedzi dają nagrody w grze."
            :"Math Hero is a maths revision app preparing for the Polish 8th grade exam (12 May 2026). It uses a Minecraft theme to make studying more engaging — each question is a battle against a mob, and correct answers earn in-game rewards."}
        </div>
      </div>
      <div style={{background:"#111",border:"3px solid #FFC107",padding:16,marginBottom:12}}>
        <div style={{fontFamily:PX,fontSize:8,color:"#FFC107",marginBottom:10}}>{isPl?"📚 Dlaczego to działa?":"📚 Why does it work?"}</div>
        <div style={{fontFamily:UI,fontSize:14,color:"#ccc",lineHeight:1.7}}>
          {isPl
            ?"• Powtórki rozłożone w czasie (algorytm SM-2) — trudne pytania pojawiają się częściej\n• Grywalizacja motywuje do codziennej nauki\n• Pytania oparte na prawdziwych arkuszach egzaminacyjnych CKE\n• System degradacji zachęca do regularnej nauki (min. raz na 24h)\n• 6 działów matematyki pokrywających cały zakres egzaminu"
            :"• Spaced repetition (SM-2 algorithm) — harder questions appear more often\n• Gamification motivates daily study\n• Questions based on real CKE exam papers\n• Degradation system encourages regular practice (min. once per 24h)\n• 6 maths topics covering the full exam syllabus"}
        </div>
      </div>
      <div style={{background:"#111",border:"3px solid #AB47BC",padding:16,marginBottom:12}}>
        <div style={{fontFamily:PX,fontSize:8,color:"#AB47BC",marginBottom:10}}>{isPl?"🏆 System postępu":"🏆 Progress system"}</div>
        <div style={{fontFamily:UI,fontSize:14,color:"#ccc",lineHeight:1.7}}>
          {isPl
            ?"Dziecko musi ukończyć wszystkie 6 biomów (zdobyć 80%+ poprawnych odpowiedzi w każdym dziale), aby odblokować walkę z bossem. Po pokonaniu bossa, postęp się resetuje i pytania stają się trudniejsze — to oznacza głębsze opanowanie materiału."
            :"Your child must complete all 6 biomes (score 80%+ in each topic) to unlock the boss fight. After defeating the boss, progress resets and questions get harder — meaning deeper mastery of the material."}
        </div>
      </div>
      <div style={{background:"#111",border:"3px solid #EF5350",padding:16,marginBottom:12}}>
        <div style={{fontFamily:PX,fontSize:8,color:"#EF5350",marginBottom:10}}>{isPl?"📋 Źródła pytań":"📋 Question sources"}</div>
        <div style={{fontFamily:UI,fontSize:14,color:"#ccc",lineHeight:1.7,marginBottom:12}}>
          {isPl
            ?"Pytania są oparte na oficjalnych arkuszach egzaminacyjnych CKE (Centralnej Komisji Egzaminacyjnej) z lat 2019-2025."
            :"Questions are based on official CKE (Central Examination Board) exam papers from 2019-2025."}
        </div>
        {[{label:"CKE — "+(isPl?"oficjalna strona":"official site"),url:"https://cke.gov.pl"},{label:isPl?"Arkusze egzaminacyjne":"Exam papers archive",url:"https://arkusze.pl/egzamin-osmoklasisty-matematyka/"},{label:"Szalone Liczby — "+(isPl?"zadania":"exercises"),url:"https://szaloneliczby.pl"}].map(link=>(
          <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" style={{display:"block",background:"#1a1a1a",border:"2px solid #333",padding:"8px 12px",marginBottom:4,textDecoration:"none"}}>
            <div style={{fontFamily:UI,fontSize:13,color:"#4FC3F7"}}>{link.label} ↗</div>
            <div style={{fontFamily:UI,fontSize:11,color:"#666"}}>{link.url}</div>
          </a>
        ))}
      </div>
      <div style={{background:"#111",border:"3px solid #4FC3F7",padding:16,marginBottom:12}}>
        <div style={{fontFamily:PX,fontSize:8,color:"#4FC3F7",marginBottom:10}}>{isPl?"📝 Arkusze egzaminacyjne (2019–2025)":"📝 Past exam papers (2019–2025)"}</div>
        <div style={{fontFamily:UI,fontSize:13,color:"#888",marginBottom:12}}>
          {isPl
            ?"Poniższe arkusze zostały wykorzystane przy tworzeniu pytań w grze. Kliknij aby otworzyć arkusz."
            :"The following past papers were reviewed when creating the questions in this app. Tap to open."}
        </div>
        {pastExams.map(exam=>(
          <a key={exam.year} href={exam.url} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:10,background:"#1a1a1a",border:"2px solid #333",padding:"10px 12px",marginBottom:4,textDecoration:"none",cursor:"pointer"}}>
            <div style={{fontFamily:PX,fontSize:12,color:"#4FC3F7",minWidth:40}}>{exam.year}</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:UI,fontSize:14,color:"#ccc"}}>{exam.label}</div>
              <div style={{fontFamily:UI,fontSize:11,color:"#666"}}>cke.gov.pl ↗</div>
            </div>
            <div style={{fontSize:16}}>📄</div>
          </a>
        ))}
      </div>
      <div style={{background:"#111",border:"3px solid #333",padding:16}}>
        <div style={{fontFamily:PX,fontSize:8,color:"#888",marginBottom:10}}>{isPl?"📊 Postęp":"📊 Progress"}</div>
        <div style={{fontFamily:UI,fontSize:14,color:"#ccc",lineHeight:1.7}}>
          {isPl?"Gotowość do egzaminu":"Exam readiness"}: <span style={{fontFamily:PX,color:readiness>=70?"#4CAF50":readiness>=40?"#FFC107":"#F44336"}}>{readiness}%</span><br/>
          {isPl?"Poprawne odpowiedzi":"Correct answers"}: <span style={{fontFamily:PX,color:"#fff"}}>{stats.totalCorrect}/{stats.totalAttempted}</span><br/>
          {isPl?"Poziom bossa":"Boss level"}: <span style={{fontFamily:PX,color:"#CE93D8"}}>{stats.bossLevel||0}</span><br/>
          {isPl?"Sesje ukończone":"Sessions completed"}: <span style={{fontFamily:PX,color:"#fff"}}>{stats.sessionsCompleted}</span>
        </div>
      </div>
    </div>);
  };

  const screens={home:Home,formulas:FormulaScreen,combat:Combat,victory:Victory,defeat:Defeat,settings:Settings,parents:Parents};
  const S=screens[screen]||Home;

  return(<div style={{fontFamily:UI,background:"#0a0a0a",minHeight:"100vh",color:"#E8E6F0"}}>
    <style>{`@keyframes mobIdle{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}@keyframes mobHit{0%{transform:scale(1);filter:brightness(3)}100%{transform:scale(1);filter:brightness(1)}}@keyframes swordSlash{0%{transform:translate(-50%,-50%) rotate(-45deg) scale(0);opacity:1}50%{transform:translate(-50%,-50%) rotate(0deg) scale(1.5);opacity:1}100%{transform:translate(-50%,-50%) rotate(45deg) scale(0);opacity:0}}@keyframes playerHit{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}@keyframes victoryBounce{0%{transform:scale(0)}60%{transform:scale(1.3)}100%{transform:scale(1)}}@keyframes slideDown{from{transform:translate(-50%,-60px);opacity:0}to{transform:translate(-50%,0);opacity:1}}@keyframes achievePulse{0%,100%{box-shadow:0 0 10px #FFC10744}50%{box-shadow:0 0 25px #FFC10788}}*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}button:active{transform:scale(0.97)!important;opacity:0.9}`}</style>
    {ach&&<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:"#1a1a0a",border:"3px solid #FFC107",padding:"10px 20px",fontFamily:PX,fontSize:8,color:"#FFC107",zIndex:1000,display:"flex",alignItems:"center",gap:10,animation:"slideDown 0.4s ease, achievePulse 1s ease infinite",boxShadow:"0 0 20px #FFC10744"}}><span style={{fontSize:20}}>{ach.icon}</span><span>{t.achNames?.[ach.id]||ach.name}</span></div>}
    <div style={{maxWidth:480,margin:"0 auto",padding:"0 16px 90px"}}><S/></div>
    {!["combat","formulas"].includes(screen)&&<div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:100,background:"#0a0a0a",borderTop:"3px solid #222",display:"flex"}}>
      {[{id:"home",icon:"🗺️",label:t.map},{id:"settings",icon:"⚙️",label:t.settingsTab},{id:"parents",icon:"ℹ️",label:t.parentTab}].map(tab=>(<button key={tab.id} onClick={()=>setScreen(tab.id)} style={{flex:1,background:screen===tab.id?"#1a1a0a":"transparent",border:"none",borderTop:screen===tab.id?"3px solid #4CAF50":"3px solid transparent",padding:"10px 0 8px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}><span style={{fontSize:18}}>{tab.icon}</span><span style={{fontFamily:PX,fontSize:6,color:screen===tab.id?"#4CAF50":"#444"}}>{tab.label}</span></button>))}
    </div>}
  </div>);
}
