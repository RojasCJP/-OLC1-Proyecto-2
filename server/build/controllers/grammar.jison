%lex

%options case-insensitive

%%

"." return "PUNTO";
"," return "COMA";
";" return 'P_COMA';
":" return 'DOSPUNTOS';
"(" return 'PARENTESIS_A';
")" return 'PARENTESIS_C';
"[" return 'CORCHETE_A';
"]" return 'CORCHETE_C';
"{" return 'LLAVE_A';
"}" return 'LLAVE_C';

"=="    return  'IGUALIGUAL';
"!="    return  'DIFERENTE';
"<="    return  'MENORIGUAL';
"<"     return  'MENOR';
">="    return  'MAYORIGUAL';
">"     return  'MAYOR';

"+" return 'MAS';
"-" return 'MENOS';
"*" return 'MULTI';
"/" return 'DIVISION';
"^" return 'POTENCIA';
"%" return 'MODULO';
"=" return 'IGUAL';
 
"int"       return  'INT';
"double"    return  'DOUBLE';
"boolean"   return  'BOOL';
"char"      return  'CHAR';
"string"    return  'STRING';
"void"      return  'VOID';
"new"       return  'NEW';
"list"      return  'LIST';

"add"           return 'ADD';
"print"         return 'PRINT';
"toLower"       return 'TOLOWER';
"toUper"        return 'TOUPER';
"length"        return 'LENGTH';
"truncate"      return 'TRUNCATE';
"round"         return 'ROUND';
"typeof"        return 'TYPEOF';
"toString"      return 'TOSTRING';
"toCharArray"   return 'TOCHARARRAY';
"exec"          return 'EXEC'

"if"        return 'IF';
"else"      return 'ELSE';
"switch"    return 'SWITCH';
"case"      return 'CASE';
"default"   return 'DEFAULT';
"break"     return 'BREAK';
"continue"  return 'CONTINUE';
"return"    return 'RETURN';
"do"        return 'DO';
"while"     return 'WHILE';
"for"       return 'FOR';

"||"    return  'OR';
"&&"    return  'AND';
"!"     return  'NOT';

[ \r\t] {}
\n      {}

[0-9]+\b                return 'ENTERO';
[0-9]+("."[0-9]+)?\b    return 'DECIMAL';
\".+\"                  return 'CADENA';
\'.\'                   return 'CARACTER'
"true"                  return 'TRUE';
"false"                 return 'FALSE';
[a-zA-z_]([0-9a-zA-z_])* return 'IDENTIFICADOR';

<<EOF>>              return 'EOF';

.  { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }

/lex

%left 'OR'
%left 'AND'
%right 'NOT'
%left 'IGUALIGUAL' 'DIFERENTE' 'MENOR' 'MENORIGUAL' 'MAYOR' 'MAYORIGUAL'
%left 'MAS' 'MENOS'
%left 'MULTI' 'DIVISION'
%left 'POTENCIA'
%right UMENOS

%start init

%%

init: instrucciones EOF;

instrucciones: instruccion instrucciones
    | instruccion; 

instruccion: if
    |switch
    |dowhile
    |while
    |for
    |declaracion_variables
    |declaracion_arreglos
    |declaracion_listas
    |asignacion_variables
    |asignacion_arreglos
    |asignacion_listas
    |declaracion_funciones
    |llamada_funciones
    |actualizacion
    |error LLAVE_C { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
    |error P_COMA { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); };

actualizacion: incremento
    |decremento;

if: IF PARENTESIS_A condicion PARENTESIS_C LLAVE_A instrucciones LLAVE_C
    |IF PARENTESIS_A condicion PARENTESIS_C LLAVE_A instrucciones LLAVE_C ELSE LLAVE_A instrucciones LLAVE_C
    |IF PARENTESIS_A condicion PARENTESIS_C LLAVE_A instrucciones LLAVE_C ELSE if
    |IF PARENTESIS_A condicion PARENTESIS_C LLAVE_A LLAVE_C
    |IF PARENTESIS_A condicion PARENTESIS_C LLAVE_A LLAVE_C ELSE LLAVE_A instrucciones LLAVE_C
    |IF PARENTESIS_A condicion PARENTESIS_C LLAVE_A instrucciones LLAVE_C ELSE LLAVE_A LLAVE_C
    |IF PARENTESIS_A condicion PARENTESIS_C LLAVE_A LLAVE_C ELSE LLAVE_A LLAVE_C
    |IF PARENTESIS_A condicion PARENTESIS_C LLAVE_A LLAVE_C ELSE if;

condicion: valor comparador valor
    |IDENTIFICADOR comparador valor
    |valor comparador IDENTIFICADOR
    |IDENTIFICADOR comparador IDENTIFICADOR
    |valor;

booleano: TRUE
    |FALSE;

comparador: IGUALIGUAL
    |DIFERENTE
    |MENOR
    |MENORIGUAL
    |MAYOR
    |MAYORIGUAL;

switch: SWITCH PARENTESIS_A IDENTIFICADOR PARENTESIS_C LLAVE_A cases LLAVE_C;

cases: case cases
    |case
    |default;

case: CASE valor DOSPUNTOS instrucciones
    |CASE valor DOSPUNTOS instrucciones BREAK P_COMA
    |CASE valor DOSPUNTOS
    |CASE valor DOSPUNTOS BREAK P_COMA;

default: DEFAULT DOSPUNTOS instrucciones
    |DEFAULT DOSPUNTOS instrucciones BREAK P_COMA
    |DEFAULT DOSPUNTOS
    |DEFAULT DOSPUNTOS BREAK P_COMA;

valor: ENTERO {console.log("entero");}
    |DECIMAL {console.log("decimal");}
    |CADENA {console.log("cadena");}
    |CARACTER {console.log("caracter");}
    |booleano {console.log("booleano")}
    |operacion {console.log("operacion");};

operacion: valor MAS valor
    |valor MENOS valor
    |valor MULTI valor
    |valor DIVISION valor
    |valor POTENCIA valor;

while: WHILE PARENTESIS_A condicion PARENTESIS_C LLAVE_A instrucciones LLAVE_C
    |WHILE PARENTESIS_A condicion PARENTESIS_C LLAVE_A LLAVE_C;

for: FOR PARENTESIS_A declaracion_variables condicion P_COMA actualizacion PARENTESIS_C LLAVE_A instrucciones LLAVE_C
    |FOR PARENTESIS_A asignacion_variables condicion P_COMA actualizacion PARENTESIS_C LLAVE_A instrucciones LLAVE_C
    |FOR PARENTESIS_A declaracion_variables condicion P_COMA actualizacion PARENTESIS_C LLAVE_A LLAVE_C
    |FOR PARENTESIS_A asignacion_variables condicion P_COMA actualizacion PARENTESIS_C LLAVE_A LLAVE_C;

dowhile: DO LLAVE_A instrucciones LLAVE_C WHILE PARENTESIS_A condicion PARENTESIS_C
    |DO LLAVE_A LLAVE_C WHILE PARENTESIS_A condicion PARENTESIS_C;

declaracion_variables: tipo IDENTIFICADOR P_COMA 
    | tipo IDENTIFICADOR IGUAL valor P_COMA
    | tipo IDENTIFICADOR IGUAL IDENTIFICADOR P_COMA
    | tipo IDENTIFICADOR IGUAL acceso_arreglos P_COMA
    | tipo IDENTIFICADOR IGUAL acceso_listas P_COMA;

asignacion_variables: IDENTIFICADOR IGUAL valor P_COMA
    | IDENTIFICADOR IGUAL IDENTIFICADOR P_COMA
    | IDENTIFICADOR IGUAL acceso_arreglos P_COMA
    | IDENTIFICADOR IGUAL acceso_listas P_COMA;

declaracion_arreglos: tipo CORCHETE_A CORCHETE_C IDENTIFICADOR IGUAL NEW tipo CORCHETE_A ENTERO CORCHETE_C P_COMA
    |tipo CORCHETE_A CORCHETE_C IDENTIFICADOR IGUAL LLAVE_A listado_datos LLAVE_C P_COMA;

asignacion_arreglos: acceso_arreglos IGUAL valor P_COMA;

declaracion_listas: LIST MENOR tipo MAYOR IDENTIFICADOR IGUAL NEW LIST MENOR tipo MAYOR P_COMA;

asignacion_listas: acceso_listas IGUAL valor P_COMA;

acceso_arreglos: IDENTIFICADOR CORCHETE_A ENTERO CORCHETE_C;

acceso_listas: IDENTIFICADOR CORCHETE_A CORCHETE_A ENTERO CORCHETE_C CORCHETE_C;

listado_datos: valor COMA listado_datos
    |valor;

tipo: INT
    |DOUBLE
    |BOOL
    |CHAR
    |STRING;

declaracion_funciones: tipo IDENTIFICADOR PARENTESIS_A parametros PARENTESIS_C LLAVE_A instrucciones LLAVE_C
    |VOID IDENTIFICADOR PARENTESIS_A parametros PARENTESIS_C LLAVE_A instrucciones LLAVE_C
    |tipo IDENTIFICADOR PARENTESIS_A parametros PARENTESIS_C LLAVE_A LLAVE_C
    |VOID IDENTIFICADOR PARENTESIS_A parametros PARENTESIS_C LLAVE_A LLAVE_C;

llamada_funciones: IDENTIFICADOR PARENTESIS_A valores PARENTESIS_C P_COMA;

parametros: parametro COMA parametros
    |parametro
    |;

parametro: tipo IDENTIFICADOR;

valores: valor COMA valores
    |valor
    |;

incremento: IDENTIFICADOR MAS MAS;

decremento: IDENTIFICADOR MENOS MENOS;