%{
    const controllador = require("./grammarController");
    const declaration = require("../tree/declaracion");
    const asignation = require("../tree/asignacion")
    const exp = require("../tree/expression");
    const iff = require("../tree/if");
    const elsee = require("../tree/else");
    const whilee = require("../tree/while");
    const func_call = require("../tree/function_call");
    const func = require("../tree/function");
    const inst = require("../tree/instruccion");
    const paramsIns = require("../tree/parametersIns");
    const sym = require("../enviroment/sym");
    const returnn = require("../tree/return");
    const listIf = require("../tree/list_if");
    const print = require("../tree/print");
    const do_while = require("../tree/do_while");
    var err;
    var instructionList = controllador.GrammarController.instructionList;
%}
%lex

%options case-insensitive

%%

/*comentarios*/
("/""/")([^\n])*\n {};
//("/""*")([^\n\r]|\n)*("*/") {console.log(yytext);}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] {};

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
[a-zA-z_]([0-9a-zA-Z_])*    return 'IDENTIFICADOR';

<<EOF>>              return 'EOF';

.  { 
    err = {tipo:"lexico", mensaje:"se recupero en "+yytext, linea:this._$.first_line, columna:this._$.first_column};
        controllador.GrammarController.errores.push(err);
    console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }

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
    |error LLAVE_C {
        err = {tipo:"sintactico", mensaje:"se recupero en "+yytext, linea:this._$.first_line, columna:this._$.first_column};
        controllador.GrammarController.errores.push(err);
        }
;

instruccion: declaracion_variables { $$ = $1 }
    |asignacion_variables { $$ = $1 }
    |actualizacion {$$ = $1 }
    |print_ P_COMA {$$ = $1}
    |else_if {$$ = new listIf.ListIf(this._$.first_line,this._$.first_column,$1);}
    |while {$$ = $1}
    |do_while {$$ = $1}
    |function {$$ = $1}
    |function_call P_COMA {$$ = $1}
    |EXEC instruccion {$$ = $2}
    |RETURN expression P_COMA {$$ = new returnn.Return($2,@2.first_line,@2.first_column);}
    |error P_COMA {
        err = {tipo:"sintactico", mensaje:"se recupero en "+yytext, linea:this._$.first_line, columna:this._$.first_column};
        controllador.GrammarController.errores.push(err);
         console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
         };

expression: MENOS expression %prec UMENOS { $$ = new exp.Expression(exp.Expression_type.NEGADO,@2.first_line,@2.first_column,$2,null); }
    |PARENTESIS_A tipo PARENTESIS_C expression
    |expression MAS expression {$$ = new exp.Expression(exp.Expression_type.SUMA, @2.first_line, @2.first_column, $1, $3); }
    |expression MENOS expression {$$ = new exp.Expression(exp.Expression_type.RESTA, @2.first_line, @2.first_column, $1, $3);}
    |expression MULTI expression {$$ = new exp.Expression(exp.Expression_type.MULTIPLICACION, @2.first_line, @2.first_column, $1, $3);}
    |expression DIVISION expression {$$ = new exp.Expression(exp.Expression_type.DIVISION, @2.first_line, @2.first_column, $1, $3);} 
    |expression POTENCIA expression {$$ = new exp.Expression(exp.Expression_type.POTENCIA, @2.first_line, @2.first_column, $1, $3);}
    |expression MODULO expression {$$ = new exp.Expression(exp.Expression_type.MODULO, @2.first_line, @2.first_column, $1, $3);}
    |PARENTESIS_A expression PARENTESIS_C {$$=$2;}
    |expression AND expression {$$ = new exp.Expression(exp.Expression_type.AND, @2.first_line, @2.first_column, $1, $3);}
    |expression OR expression {$$ = new exp.Expression(exp.Expression_type.OR, @2.first_line, @2.first_column, $1, $3);}
    |NOT expression {$$ = new exp.Expression(exp.Expression_type.NOT,@2.first_line,@2.first_column,$2,null);}
    |expression MAYOR expression {$$ = new exp.Expression(exp.Expression_type.MAYOR, @2.first_line, @2.first_column, $1, $3);}
    |expression MENOR expression {$$ = new exp.Expression(exp.Expression_type.MENOR, @2.first_line, @2.first_column, $1, $3);}
    |expression MAYORIGUAL expression {$$ = new exp.Expression(exp.Expression_type.MAYORIGUAL, @2.first_line, @2.first_column, $1, $3);}
    |expression MENORIGUAL expression {$$ = new exp.Expression(exp.Expression_type.MENORIGUAL, @2.first_line, @2.first_column, $1, $3);}
    |expression IGUALIGUAL expression {$$ = new exp.Expression(exp.Expression_type.IGUALIGUAL, @2.first_line, @2.first_column, $1, $3);}
    |expression DIFERENTE expression {$$ = new exp.Expression(exp.Expression_type.DIFERENTE, @2.first_line, @2.first_column, $1, $3);}
    |expression MAS MAS {$$ = new exp.Expression(exp.Expression_type.AUMENTO,@2.first_line,@2.first_column,$1,$1);}
    |expression MENOS MENOS {$$ = new exp.Expression(exp.Expression_type.DISMINUCION,@2.first_line,@2.first_column,$1,$1);}
    |ENTERO {$$ = new exp.Expression(exp.Expression_type.ENTERO,this._$.first_line,this._$.first_column,null,null,$1);}
    |DECIMAL {$$ = new exp.Expression(exp.Expression_type.DECIMAL,this._$.first_line,this._$.first_column,null,null,$1);}
    |CADENA {$$ = new exp.Expression(exp.Expression_type.CADENA,this._$.first_line,this._$.first_column,null,null,$1);}
    |CARACTER {$$ = new exp.Expression(exp.Expression_type.CHAR,this._$.first_line,this._$.first_column,null,null,$1);}
    |FALSE {$$ = new exp.Expression(exp.Expression_type.BOOLEAN,this._$.first_line,this._$.first_column,null,null,$1);}
    |TRUE {$$ = new exp.Expression(exp.Expression_type.BOOLEAN,this._$.first_line,this._$.first_column,null,null,$1);}
    |IDENTIFICADOR {$$ = new exp.Expression(exp.Expression_type.IDENTIFICADOR,this._$.first_line,this._$.first_column,null,null,$1);}
    |function_call {$$ = new exp.Expression(exp.Expression_type.FUNCION,this._$.first_line,this._$.first_column,null,null,$1.id,$1.parametersExpressions);}
;

actualizacion: incremento
    |decremento
;

declaracion_variables: tipo IDENTIFICADOR P_COMA {$$ = new declaration.Declaration($2,$1,null,@2.first_line,@2.first_column);}
    |tipo IDENTIFICADOR IGUAL expression P_COMA {$$ = new declaration.Declaration($2,$1,$4,@2.first_line,@2.first_column);}
;

asignacion_variables: IDENTIFICADOR IGUAL expression P_COMA {$$ = new asignation.Asignation($1,$3,@2.first_line,@2.first_column);}
;

while: WHILE PARENTESIS_A expression PARENTESIS_C LLAVE_A instrucciones LLAVE_C { $$ = new whilee.While($3,$6,@2.first_line,@2.first_column); }
;

do_while: DO LLAVE_A instrucciones LLAVE_C WHILE PARENTESIS_A expression PARENTESIS_C P_COMA { $$ = new do_while.DoWhile($7, $3,@2.first_line,@2.first_column); }
;

if: IF PARENTESIS_A expression PARENTESIS_C LLAVE_A instrucciones LLAVE_C {$$ = new iff.If($3,$6,@2.first_line,@2.first_column) ;}
    |LLAVE_A instrucciones LLAVE_C {$$ = new elsee.Else($2,@2.first_line,@2.first_column);}
;

else_if: else_if ELSE if
    {
        $$ = $1;
        $$.push($3);
    }
    |if
    {
        $$ =[];
        $$.push($1);
    }
;

function: tipo IDENTIFICADOR PARENTESIS_A parametros PARENTESIS_C LLAVE_A instrucciones LLAVE_C {$$ = new func.Function($2,$1,$7,$4,@2.first_line,@2.first_column);}
    |tipo IDENTIFICADOR PARENTESIS_A PARENTESIS_C LLAVE_A instrucciones LLAVE_C {$$ = new func.Function($2,$1,$6,null,@2.first_line,@2.first_column);}
;

function_call: IDENTIFICADOR PARENTESIS_A PARENTESIS_C {$$ = new func_call.FunctionCall($1,null,@2.first_line,@2.first_column);}
    |IDENTIFICADOR PARENTESIS_A params_value PARENTESIS_C {$$ = new func_call.FunctionCall($1,$3,@2.first_line,@2.first_column);}
;

parametros: parametros COMA tipo IDENTIFICADOR
    {
        $$ = $1;
        $$.push(new declaration.Declaration($4,$3,null,@2.first_line,@2.first_column));
    }
    |tipo IDENTIFICADOR
    {
        $$ = [];
        $$.push(new declaration.Declaration($2,$1,null,@2.first_line,@2.first_column));
    }
;

params_value: params_value COMA expression
    {
        $$ = $1;
        $$.push($3);
    }
    |expression
    {
        $$ = [];
        $$.push($1);
    }
;

tipo: INT {$$ = sym.EnumType.int;}
    |DOUBLE {$$ = sym.EnumType.double;}
    |BOOL {$$ = sym.EnumType.boolean;}
    |CHAR {$$ = sym.EnumType.char;}
    |STRING {$$ = sym.EnumType.string;}
    |VOID {$$ = sym.EnumType.void}
;

print_: PRINT PARENTESIS_A expression PARENTESIS_C {$$ = new print.Print($3,@2.first_line,@2.first_column);};