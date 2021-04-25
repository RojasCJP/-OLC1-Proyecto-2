%{
    const controllador = require("./grammarController");
    const declaration = require("../tree/declaracion");
    const asignation = require("../tree/asignacion")
    const exp = require("../tree/expression");
    const iff = require("../tree/if")
    const func_call = require("../tree/function_call");
    const func = require("../tree/function");
    const inst = require("../tree/instruccion");
    const paramsIns = require("../tree/parametersIns");
    const sym = require("../enviroment/sym")
    var err;
    var instructionList = controllador.GrammarController.instructionList;
%}
%lex

%options case-insensitive

%%

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

[0-9]+("."[0-9]+)\b         return 'DECIMAL';
[0-9]+\b                    return 'ENTERO';
("\"")([^\"\\]|\\.)*("\"")  return 'CADENA';
"'"([^']*)"'"               return 'CARACTER'
"true"                      return 'TRUE';
"false"                     return 'FALSE';
[a-zA-z_]([0-9a-zA-z_])*    return 'IDENTIFICADOR';

<<EOF>>              return 'EOF';

.  { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }

/lex

%left 'OR'
%left 'AND'
%right 'NOT'
%left 'IGUALIGUAL' 'DIFERENTE' 'MENOR' 'MENORIGUAL' 'MAYOR' 'MAYORIGUAL'
%left 'MAS' 'MENOS'
%left 'MULTI' 'DIVISION' 'MODULO'
%left 'POTENCIA'
%right UMENOS
%left 'PARENTESIS_A' 'PARENTESIS_C'

%start init

%%

init: instrucciones EOF {controllador.GrammarController.instructionList = $1;}
;

instrucciones: instrucciones instruccion {
        $$ = $1;
        $$.push($2);
    }
    | instruccion {
        $$ = []
        $$.push($1)
    }
; 

sentencias: LLAVE_A instrucciones LLAVE_C
    |LLAVE_A LLAVE_C
    |error LLAVE_C {console.log('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column);}
;

instruccion: declaracion_variables { $$ = $1 }
    |asignacion_variables { $$ = $1 }
    |actualizacion {$$ = $1 }
    |if {$$ = $1}
    |error P_COMA { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); };

expression: MENOS expression %prec UMENOS
    |PARENTESIS_A tipo PARENTESIS_C expression
    |expression MAS expression {$$ = new exp.Expression(exp.Expression_type.SUMA, @2.first_line, @2.first_column, $1, $3); console.log('llega a suma');}
    |expression MENOS expression {$$ = new exp.Expression(exp.Expression_type.RESTA, @2.first_line, @2.first_column, $1, $3);}
    |expression MULTI expression {$$ = new exp.Expression(exp.Expression_type.MULTIPLICACION, @2.first_line, @2.first_column, $1, $3);}
    |expression DIVISION expression {$$ = new exp.Expression(exp.Expression_type.DIVISION, @2.first_line, @2.first_column, $1, $3);} 
    |expression POTENCIA expression {$$ = new exp.Expression(exp.Expression_type.POTENCIA, @2.first_line, @2.first_column, $1, $3);}
    |expression MODULO expression {$$ = new exp.Expression(exp.Expression_type.MODULO, @2.first_line, @2.first_column, $1, $3);}
    |PARENTESIS_A expression PARENTESIS_C {$$=$2; console.log("llega a parentesis");}
    |expression AND expression {$$ = new exp.Expression(exp.Expression_type.AND, @2.first_line, @2.first_column, $1, $3);}
    |expression OR expression {$$ = new exp.Expression(exp.Expression_type.OR, @2.first_line, @2.first_column, $1, $3);}
    |NOT expression
    |expression MAYOR expression {$$ = new exp.Expression(exp.Expression_type.MAYOR, @2.first_line, @2.first_column, $1, $3);}
    |expression MENOR expression {$$ = new exp.Expression(exp.Expression_type.MENOR, @2.first_line, @2.first_column, $1, $3);}
    |expression MAYORIGUAL expression {$$ = new exp.Expression(exp.Expression_type.MAYORIGUAL, @2.first_line, @2.first_column, $1, $3);}
    |expression MENORIGUAL expression {$$ = new exp.Expression(exp.Expression_type.MENORIGUAL, @2.first_line, @2.first_column, $1, $3);}
    |expression IGUALIGUAL expression {$$ = new exp.Expression(exp.Expression_type.IGUALIGUAL, @2.first_line, @2.first_column, $1, $3);}
    |expression DIFERENTE expression {$$ = new exp.Expression(exp.Expression_type.DIFERENTE, @2.first_line, @2.first_column, $1, $3);}
    |expression MAS MAS
    |expression MENOS MENOS
    |IDENTIFICADOR {$$ = new exp.Expression(exp.Expression_type.IDENTIFICADOR,this._$.first_line,this._$.first_column,null,null,$1)}
    |ENTERO {$$ = new exp.Expression(exp.Expression_type.ENTERO,this._$.first_line,this._$.first_column,null,null,$1);}
    |DECIMAL {$$ = new exp.Expression(exp.Expression_type.DECIMAL,this._$.first_line,this._$.first_column,null,null,$1);}
    |CADENA {$$ = new exp.Expression(exp.Expression_type.CADENA,this._$.first_line,this._$.first_column,null,null,$1);}
    |CARACTER {$$ = new exp.Expression(exp.Expression_type.CHAR,this._$.first_line,this._$.first_column,null,null,$1);}
    |FALSE {$$ = new exp.Expression(exp.Expression_type.BOOLEAN,this._$.first_line,this._$.first_column,null,null,$1);}
    |TRUE {$$ = new exp.Expression(exp.Expression_type.BOOLEAN,this._$.first_line,this._$.first_column,null,null,$1);}
;

actualizacion: incremento
    |decremento
;

declaracion_variables: tipo IDENTIFICADOR P_COMA {$$ = new declaration.Declaration($2,$1,null,@2.first_line,@2.first_column)}
    |tipo IDENTIFICADOR IGUAL expression P_COMA {$$ = new declaration.Declaration($2,$1,$4,@2.first_line,@2.first_column)}
;

asignacion_variables: IDENTIFICADOR IGUAL expression P_COMA {$$ = new asignation.Asignation($1,$3,@2.first_line,@2.first_column)}
;

if: IF PARENTESIS_A expression PARENTESIS_C LLAVE_A instrucciones LLAVE_C {$$ = new iff.If($3,$6,@2.first_line,@2.first_column) }
;

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


while: WHILE PARENTESIS_A expression PARENTESIS_C LLAVE_A instrucciones LLAVE_C
    |WHILE PARENTESIS_A expression PARENTESIS_C LLAVE_A LLAVE_C;

for: FOR PARENTESIS_A declaracion_variables expression P_COMA actualizacion PARENTESIS_C LLAVE_A instrucciones LLAVE_C
    |FOR PARENTESIS_A asignacion_variables expression P_COMA actualizacion PARENTESIS_C LLAVE_A instrucciones LLAVE_C
    |FOR PARENTESIS_A declaracion_variables expression P_COMA actualizacion PARENTESIS_C LLAVE_A LLAVE_C
    |FOR PARENTESIS_A asignacion_variables expression P_COMA actualizacion PARENTESIS_C LLAVE_A LLAVE_C;

dowhile: DO LLAVE_A instrucciones LLAVE_C WHILE PARENTESIS_A expression PARENTESIS_C
    |DO LLAVE_A LLAVE_C WHILE PARENTESIS_A expression PARENTESIS_C;

declaracion_arreglos: tipo CORCHETE_A CORCHETE_C IDENTIFICADOR IGUAL NEW tipo CORCHETE_A ENTERO CORCHETE_C P_COMA
    |tipo CORCHETE_A CORCHETE_C IDENTIFICADOR IGUAL LLAVE_A listado_datos LLAVE_C P_COMA;

asignacion_arreglos: acceso_arreglos IGUAL valor P_COMA;

declaracion_listas: LIST MENOR tipo MAYOR IDENTIFICADOR IGUAL NEW LIST MENOR tipo MAYOR P_COMA;

asignacion_listas: acceso_listas IGUAL valor P_COMA;

acceso_arreglos: IDENTIFICADOR CORCHETE_A ENTERO CORCHETE_C;

acceso_listas: IDENTIFICADOR CORCHETE_A CORCHETE_A ENTERO CORCHETE_C CORCHETE_C;

listado_datos: valor COMA listado_datos
    |valor;

tipo: INT {$$ = sym.EnumType.int;}
    |DOUBLE {$$ = sym.EnumType.double;}
    |BOOL {$$ = sym.EnumType.boolean;}
    |CHAR {$$ = sym.EnumType.char;}
    |STRING {$$ = sym.EnumType.string;}
;

declaracion_funciones: tipo IDENTIFICADOR PARENTESIS_A parametros PARENTESIS_C LLAVE_A instrucciones LLAVE_C
    |VOID IDENTIFICADOR PARENTESIS_A parametros PARENTESIS_C LLAVE_A instrucciones LLAVE_C
    |tipo IDENTIFICADOR PARENTESIS_A parametros PARENTESIS_C LLAVE_A LLAVE_C
    |VOID IDENTIFICADOR PARENTESIS_A parametros PARENTESIS_C LLAVE_A LLAVE_C;

print: PRINT PARENTESIS_A valor PARENTESIS_C P_COMA{console.log("print");};

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