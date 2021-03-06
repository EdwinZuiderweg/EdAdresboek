<!--
  var Personenlijst = new Array(100);
  var PtabelID = new Array(100); //houdt bij in welke rij tabel persoon staat 
  var Paantal = 0;  
  var OldSelRij;
  var geselecteerdeID = -1;
  var klikkopnr = 0;

  for (var i = 0; i < 100; i++) {
     Personenlijst[i] = new Array(6); //id, voornaam, achternaam, adres, postcode, woonplaats  
  } 

  //******************************************************************************************
  function Vuladreslijst() {       
     //initialiseer adreslijst
     for (var p=0; p<Personenlijst.length; p++) {     
       Personenlijst[p][0] = -1;  //-1 = bestaat niet  
       Personenlijst[p][1] = "";
       Personenlijst[p][2] = "";  
       Personenlijst[p][3] = "";
       Personenlijst[p][4] = "";
       Personenlijst[p][5] = ""; 
     }

     OldSelRij  = -1;  
     //maak een stuk of 5 fictieve personen aan om tabel alvast een beetje te vullen
     Personenlijst[Paantal][0] =  Paantal; //sleutel
     Personenlijst[Paantal][1] = "Klaas";     
     Personenlijst[Paantal][2] = "Abma";
     Personenlijst[Paantal][3] = "Verzetstrijderlaan 46";
     Personenlijst[Paantal][4] = "9768AB";
     Personenlijst[Paantal][5] = "Heerenveen";
     PtabelID[Paantal] = Paantal;
     Paantal++;       
     Personenlijst[Paantal][0] =  Paantal; //sleutel
     Personenlijst[Paantal][1] = "Wim";
     Personenlijst[Paantal][2] = "Krijnen";
     Personenlijst[Paantal][3] = "Paterswoldseweg 67";
     Personenlijst[Paantal][4] = "9728HB";
     Personenlijst[Paantal][5] = "Sauwerd";
     PtabelID[Paantal] = Paantal;
     Paantal++;
     Personenlijst[Paantal][0] =  Paantal; //sleutel   
     Personenlijst[Paantal][1] = "Joris";
     Personenlijst[Paantal][2] = "Brenninkmeijer";
     Personenlijst[Paantal][3] = "Klaproosstraat 58";
     Personenlijst[Paantal][4] = "3356FV";
     Personenlijst[Paantal][5] = "Eelde";
     PtabelID[Paantal] = Paantal;
     Paantal++;      
     Personenlijst[Paantal][0] =  Paantal; //sleutel
     Personenlijst[Paantal][1] = "Huub";
     Personenlijst[Paantal][2] = "Roeterink";
     Personenlijst[Paantal][3] = "Oranjetip 47";
     Personenlijst[Paantal][4] = "3529GB";
     Personenlijst[Paantal][5] = "Tolbert";
     PtabelID[Paantal] = Paantal;
     Paantal++;
     
     var txtPersoon;

     var table = document.getElementById("tbAdreslijst");   
    
     Vultabel(); 
     
     MaakTabelklikbaar(); 
     
  }  

  //********************************************************************
  function Vultabel() {
     var table = document.getElementById("tbAdreslijst");   
 
     //1e rij van tabel gereserveerd voor koppen
     for (var p=0; p<Paantal; p++) {      
       if (table.rows.length == p+1) { //als nog niet bestaat maak aan
         Maaktabelrij(table, p); 
       }
     }
 
     for (var p=0; p<Paantal; p++) {
       for (var i=0; i<5; i++) { 
          table.rows[p+1].cells[i].innerHTML = Personenlijst[p][i+1];
       }         
     }     
     
     if (table.rows.length > (Paantal +1)) {
       Verwijdertabelrij(table, Paantal); 
     }
  }

  //********************************************************************
  function MaakTabelklikbaar(table) {    
     var table = document.getElementById("tbAdreslijst");
     
     for (var i = 1; i < table.rows.length; i++) {                               
        table.rows[i].onclick = function () {
           SelecteerTabelrij(this);
        };
     } 

     for (var k = 0; k < table.rows[0].cells.length; k++) {
        table.rows[0].cells[k].onclick = function () {
           SelecteerTabelkop(this);
        }
     }
         
  }

  //******************************************************************************************
  function SelecteerTabelkop(tabelkop) {
    var Kolom;
        
    Kolom = tabelkop.cellIndex+1;            
    SorteerAdresLijst(Kolom);
  }

  //******************************************************************************************
  function SorteerAdresLijst(k) {
     var HulpAdres = new Array(6);  
     var Doorgaan;
     var sorteerrichting;
 
     if (klikkopnr == 0) {sorteerrichting = "laagnaarhoog";}                      
     else {sorteerrichting = "hoognaarlaag";}
     
     Doorgaan = true;
     
     if (sorteerrichting == "laagnaarhoog") {
       while (Doorgaan) {        
         Doorgaan = false; 
         for (var p = 0; p< Paantal-1; p++) {         
           if (Personenlijst[p][k] > Personenlijst[p+1][k]) {           
             Doorgaan = true;
             for (var i=0; i<6; i++) {
               HulpAdres[i] = Personenlijst[p][i];
               Personenlijst[p][i] = Personenlijst[p+1][i];
               Personenlijst[p+1][i] = HulpAdres[i];            
             }
           } 
         }
       }
     }
     if (sorteerrichting == "hoognaarlaag") {
       while (Doorgaan) {        
         Doorgaan = false; 
         for (var p = 0; p< Paantal-1; p++) {         
           if (Personenlijst[p][k] < Personenlijst[p+1][k]) {           
             Doorgaan = true;
             for (var i=0; i<6; i++) {
               HulpAdres[i] = Personenlijst[p][i];
               Personenlijst[p][i] = Personenlijst[p+1][i];
               Personenlijst[p+1][i] = HulpAdres[i];            
             }
           } 
         }
       }     
     }
     
     if (klikkopnr == 0) {klikkopnr++;}
     else {klikkopnr = 0;}
     //alert(klikkopnr);      
     geselecteerdeID = -1;
     HernummerPlijst();
     Vultabel();
     
  } 

  //******************************************************************************************
  function Maaktabelrij(table, pnr) { 
     var tr = document.createElement("tr"); 
     tr.id = "a" + pnr;        
     
     for (var i=0; i<5; i++) {
       var td = document.createElement("td");  
       td.bgColor = "FFFFFF";   
       td.style.borderHeight = "2em";
       td.style.borderWidth = "1px";        
       tr.appendChild(td);
     }                            
     table.appendChild(tr);   
     //document.forms[0].    
  }   

  //******************************************************************************************  
  function Verwijdertabelrij(table, Pnr ) {        
     var tr = document.getElementById("a" + Pnr);                  
     table.removeChild(tr);     
  }  

  //******************************************************************************************
  function SelecteerTabelrij(tabelrij) { 
    var NewSelRij;    

    geselecteerdeID = tabelrij.rowIndex-1;    
    NewSelRij = tabelrij.rowIndex;   
    //deselecteer oude selectierij
    if (OldSelRij != -1) {
      for (var i= 0; i < tabelrij.cells.length; i++) {         
        tabelrij.parentNode.rows[OldSelRij].cells[i].bgColor = "#FFFFFF";       
      }      
    }
    
    if (OldSelRij != NewSelRij) {      
      for (var i= 0; i < tabelrij.cells.length; i++) {         
         tabelrij.cells[i].bgColor = "#EEEEE00";
      }
      document.forms[0].Voornaam.value = tabelrij.cells[0].innerHTML;
      document.forms[0].Achternaam.value = tabelrij.cells[1].innerHTML;
      document.forms[0].Adres.value = tabelrij.cells[2].innerHTML;
      document.forms[0].Postcode.value = tabelrij.cells[3].innerHTML;
      document.forms[0].Woonplaats.value = tabelrij.cells[4].innerHTML;             
      //alert(geselecteerdeID);
      OldSelRij = NewSelRij;    
    }
    else {
      OldSelRij = -1;
    }        
  }  

  //******************************************************************************************
  function SchuifopPlijst(Beginnr, Eindnr) {
    for (var p= Beginnr; p < Eindnr; p++) {       
      for (var i=0; i<6; i++) { 
        Personenlijst[p][i] = Personenlijst[p+1][i];   
      }     
    }
    Personenlijst[Eindnr][0] = -1;
  }

  //******************************************************************************************
  function HernummerPlijst() {
    var p = 0;
    while(Personenlijst[p][0]!=-1) {
       Personenlijst[p][0] = p;
       p++;
    }        
  }

  //******************************************************************************************
  function Nieuwadres() {
    geselecteerdeID = Paantal; //id nieuw adres bij opslaan
    document.forms[0].Voornaam.value = "";
    document.forms[0].Achternaam.value = "";
    document.forms[0].Adres.value = "";
    document.forms[0].Postcode.value = "";
    document.forms[0].Woonplaats.value = ""; 
  }
 
  //******************************************************************************************
  function Verwijderadres() {    
    //1: "verwijder adres"  
    if ((document.forms[0].Voornaam.value == "") || (document.forms[0].Achternaam.value == "")) {
      alert("Geen geldig adres geselecteerd");    
    }
    else {
      var verwijder = confirm("Weet je zeker dat je " + document.forms[0].Voornaam.value + " " + 
      document.forms[0].Achternaam.value + " wilt verwijderen?");
      if (verwijder) {
        Personenlijst[geselecteerdeID][0] = -1;    
        Personenlijst[geselecteerdeID][1] = "";
        Personenlijst[geselecteerdeID][2] = "";  
        Personenlijst[geselecteerdeID][3] = "";
        Personenlijst[geselecteerdeID][4] = "";
        Personenlijst[geselecteerdeID][5] = "";
        SchuifopPlijst(geselecteerdeID, Paantal); 
        HernummerPlijst();                
        document.forms[0].Voornaam.value = "";
        document.forms[0].Achternaam.value = "";
        document.forms[0].Adres.value = "";
        document.forms[0].Postcode.value = "";
        document.forms[0].Woonplaats.value = "";        
        Paantal--;
        Vultabel();        
        if (OldSelRij > Paantal) {
          OldSelRij = -1;  
        }
        geselecteerdeID = -1;      
      }  
      else {alert("Verwijderen ongedaan gemaakt");}       
    }              
  }

  //****************************************************************************************** 
  function Saveadres() {
     if ((document.forms[0].Voornaam.value != "") && 
         (document.forms[0].Achternaam.value != "") &&
         (document.forms[0].Adres.value != "") &&
         (document.forms[0].Postcode.value != "") &&
         (document.forms[0].Woonplaats.value != "")
       ) { 
       Personenlijst[geselecteerdeID][0] = Paantal;    
       Personenlijst[geselecteerdeID][1] = document.forms[0].Voornaam.value;
       Personenlijst[geselecteerdeID][2] = document.forms[0].Achternaam.value;  
       Personenlijst[geselecteerdeID][3] = document.forms[0].Adres.value;
       Personenlijst[geselecteerdeID][4] = document.forms[0].Postcode.value;
       Personenlijst[geselecteerdeID][5] = document.forms[0].Woonplaats.value;
       if (geselecteerdeID == Paantal) {//nieuw adres      
         Paantal++;
       }
       
       document.forms[0].Voornaam.value = ""; 
       document.forms[0].Achternaam.value = "";
       document.forms[0].Adres.value = ""; 
       document.forms[0].Postcode.value = "";
       document.forms[0].Woonplaats.value ="";
       document.forms[0].Voornaam.focus();
       geselecteerdeID = Paantal;
       Vultabel();
       MaakTabelklikbaar();               
     }
     else { //niet alle velden zijn ingevuld, het hele feest gaat niet door        
        if  (document.forms[0].Voornaam.value == "") {
           alert("Verplicht veld Voornaam niet ingevuld!");
           document.forms[0].Voornaam.focus();
        }
        else if (document.forms[0].Achternaam.value == "") {
           alert("Verplicht veld Achternaam niet ingevuld!");
           document.forms[0].Achternaam.focus();
        } 
        else if (document.forms[0].Adres.value == "") {
           alert("Verplicht veld Adres niet ingevuld!");
           document.forms[0].Adres.focus();
        }
        else if (document.forms[0].Postcode.value == "") {
           alert("Verplicht veld Postcode niet ingevuld!");
           document.forms[0].Postcode.focus();
        }  
        else if (document.forms[0].Woonplaats.value == "") {
           alert("Verplicht veld Woonplaats niet ingevuld!");
           document.forms[0].Woonplaats.focus();
        }
     }
  }

-->