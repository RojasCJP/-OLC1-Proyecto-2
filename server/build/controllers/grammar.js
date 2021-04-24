/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var grammar = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,7],$V1=[1,9],$V2=[1,12],$V3=[1,13],$V4=[1,14],$V5=[1,15],$V6=[1,16],$V7=[2,5,41,77,78,79,80,81],$V8=[18,41],$V9=[1,27],$Va=[1,28],$Vb=[1,29],$Vc=[1,30],$Vd=[1,31],$Ve=[1,32],$Vf=[1,33],$Vg=[1,34],$Vh=[1,35],$Vi=[1,41],$Vj=[1,40],$Vk=[1,42],$Vl=[1,43],$Vm=[1,44],$Vn=[1,45],$Vo=[1,46],$Vp=[1,47],$Vq=[1,48],$Vr=[1,49],$Vs=[1,50],$Vt=[1,51],$Vu=[1,52],$Vv=[1,53],$Vw=[13,15,18,19,20,21,22,23,24,25,27,28,29,30,31,32],$Vx=[13,18,24,25],$Vy=[13,15,18,19,24,25,27,28,29,30,31,32],$Vz=[13,15,18,19,20,21,23,24,25,27,28,29,30,31,32],$VA=[13,18,24,25,27,28,29,30,31,32];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"init":3,"instrucciones":4,"EOF":5,"instruccion":6,"sentencias":7,"LLAVE_A":8,"LLAVE_C":9,"declaracion_variables":10,"asignacion_variables":11,"actualizacion":12,"P_COMA":13,"expression":14,"MENOS":15,"PARENTESIS_A":16,"tipo":17,"PARENTESIS_C":18,"MAS":19,"MULTI":20,"DIVISION":21,"POTENCIA":22,"MODULO":23,"AND":24,"OR":25,"NOT":26,"MAYOR":27,"MENOR":28,"MAYORIGUAL":29,"MENORIGUAL":30,"IGUALIGUAL":31,"DIFERENTE":32,"ENTERO":33,"DECIMAL":34,"CADENA":35,"CARACTER":36,"FALSE":37,"TRUE":38,"incremento":39,"decremento":40,"IDENTIFICADOR":41,"IGUAL":42,"if":43,"IF":44,"ELSE":45,"condicion":46,"valor":47,"comparador":48,"booleano":49,"switch":50,"SWITCH":51,"cases":52,"case":53,"default":54,"CASE":55,"DOSPUNTOS":56,"BREAK":57,"DEFAULT":58,"while":59,"WHILE":60,"for":61,"FOR":62,"dowhile":63,"DO":64,"declaracion_arreglos":65,"CORCHETE_A":66,"CORCHETE_C":67,"NEW":68,"listado_datos":69,"asignacion_arreglos":70,"acceso_arreglos":71,"declaracion_listas":72,"LIST":73,"asignacion_listas":74,"acceso_listas":75,"COMA":76,"INT":77,"DOUBLE":78,"BOOL":79,"CHAR":80,"STRING":81,"declaracion_funciones":82,"parametros":83,"VOID":84,"print":85,"PRINT":86,"llamada_funciones":87,"valores":88,"parametro":89,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"LLAVE_A",9:"LLAVE_C",13:"P_COMA",15:"MENOS",16:"PARENTESIS_A",18:"PARENTESIS_C",19:"MAS",20:"MULTI",21:"DIVISION",22:"POTENCIA",23:"MODULO",24:"AND",25:"OR",26:"NOT",27:"MAYOR",28:"MENOR",29:"MAYORIGUAL",30:"MENORIGUAL",31:"IGUALIGUAL",32:"DIFERENTE",33:"ENTERO",34:"DECIMAL",35:"CADENA",36:"CARACTER",37:"FALSE",38:"TRUE",41:"IDENTIFICADOR",42:"IGUAL",44:"IF",45:"ELSE",47:"valor",51:"SWITCH",55:"CASE",56:"DOSPUNTOS",57:"BREAK",58:"DEFAULT",60:"WHILE",62:"FOR",64:"DO",66:"CORCHETE_A",67:"CORCHETE_C",68:"NEW",73:"LIST",76:"COMA",77:"INT",78:"DOUBLE",79:"BOOL",80:"CHAR",81:"STRING",84:"VOID",86:"PRINT"},
productions_: [0,[3,2],[4,2],[4,1],[7,3],[7,2],[7,2],[6,1],[6,1],[6,1],[6,2],[14,2],[14,4],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[14,2],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[14,1],[14,1],[14,1],[14,1],[14,1],[14,1],[12,1],[12,1],[10,3],[10,5],[11,4],[43,7],[43,11],[43,9],[43,6],[43,10],[43,10],[43,9],[43,8],[46,3],[46,3],[46,3],[46,3],[46,1],[49,1],[49,1],[48,1],[48,1],[48,1],[48,1],[48,1],[48,1],[50,7],[52,2],[52,1],[52,1],[53,4],[53,6],[53,3],[53,5],[54,3],[54,5],[54,2],[54,4],[59,7],[59,6],[61,10],[61,10],[61,9],[61,9],[63,8],[63,7],[65,11],[65,9],[70,4],[72,12],[74,4],[71,4],[75,6],[69,3],[69,1],[17,1],[17,1],[17,1],[17,1],[17,1],[82,8],[82,8],[82,7],[82,7],[85,5],[87,5],[83,3],[83,1],[83,0],[89,2],[88,3],[88,1],[88,0],[39,3],[40,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
controllador.GrammarController.instructionList = $$[$0-1];
break;
case 2:

        this.$ = $$[$0-1];
        this.$.push($$[$0]);
    
break;
case 3:

        this.$ = []
        this.$.push($$[$0])
    
break;
case 6:
console.log('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column);
break;
case 7: case 8:
 this.$ = $$[$0] 
break;
case 9:
this.$ = $$[$0] 
break;
case 10:
 console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
break;
case 13:
this.$ = new exp.Expression(exp.Expression_type.SUMA, _$[$0-1].first_line, _$[$0-1].first_column, $$[$0-2], $$[$0-1]);
break;
case 14:
this.$ = new exp.Expression(exp.Expression_type.RESTA, _$[$0-1].first_line, _$[$0-1].first_column, $$[$0-2], $$[$0-1]);
break;
case 15:
this.$ = new exp.Expression(exp.Expression_type.MULTIPLICACION, _$[$0-1].first_line, _$[$0-1].first_column, $$[$0-2], $$[$0-1]);
break;
case 16:
this.$ = new exp.Expression(exp.Expression_type.DIVISION, _$[$0-1].first_line, _$[$0-1].first_column, $$[$0-2], $$[$0-1]);
break;
case 17:
this.$ = new exp.Expression(exp.Expression_type.POTENCIA, _$[$0-1].first_line, _$[$0-1].first_column, $$[$0-2], $$[$0-1]);
break;
case 18:
this.$ = new exp.Expression(exp.Expression_type.MODULO, _$[$0-1].first_line, _$[$0-1].first_column, $$[$0-2], $$[$0-1]);
break;
case 19:
this.$=$$[$0-1];
break;
case 20:
this.$ = new exp.Expression(exp.Expression_type.AND, _$[$0-1].first_line, _$[$0-1].first_column, $$[$0-2], $$[$0-1]);
break;
case 21:
this.$ = new exp.Expression(exp.Expression_type.OR, _$[$0-1].first_line, _$[$0-1].first_column, $$[$0-2], $$[$0-1]);
break;
case 23:
this.$ = new exp.Expression(exp.Expression_type.MAYOR, _$[$0-1].first_line, _$[$0-1].first_column, $$[$0-2], $$[$0-1]);
break;
case 24:
this.$ = new exp.Expression(exp.Expression_type.MENOR, _$[$0-1].first_line, _$[$0-1].first_column, $$[$0-2], $$[$0-1]);
break;
case 25:
this.$ = new exp.Expression(exp.Expression_type.MAYORIGUAL, _$[$0-1].first_line, _$[$0-1].first_column, $$[$0-2], $$[$0-1]);
break;
case 26:
this.$ = new exp.Expression(exp.Expression_type.MENORIGUAL, _$[$0-1].first_line, _$[$0-1].first_column, $$[$0-2], $$[$0-1]);
break;
case 27:
this.$ = new exp.Expression(exp.Expression_type.IGUALIGUAL, _$[$0-1].first_line, _$[$0-1].first_column, $$[$0-2], $$[$0-1]);
break;
case 28:
this.$ = new exp.Expression(exp.Expression_type.DIFERENTE, _$[$0-1].first_line, _$[$0-1].first_column, $$[$0-2], $$[$0-1]);
break;
case 31:
this.$ = new exp.Expression(exp.Expression_type.ENTERO,this._$.first_line,this._$.first_column,null,null,$$[$0]);
break;
case 32:
this.$ = new exp.Expression(exp.Expression_type.DECIMAL,this._$.first_line,this._$.first_column,null,null,$$[$0]); console.log('hasta aquI');
break;
case 33:
this.$ = new exp.Expression(exp.Expression_type.CADENA,this._$.first_line,this._$.first_column,null,null,$$[$0]);
break;
case 34:
this.$ = new exp.Expression(exp.Expression_type.CHAR,this._$.first_line,this._$.first_column,null,null,$$[$0]);
break;
case 35: case 36:
this.$ = new exp.Expression(exp.Expression_type.BOOLEAN,this._$.first_line,this._$.first_column,null,null,$$[$0]);
break;
case 39:
this.$ = new declaration.Declaration($$[$0-1],$$[$0-2],null,_$[$0-1].first_line,_$[$0-1].first_column)
break;
case 40:
this.$ = new declaration.Declaration($$[$0-3],$$[$0-4],$$[$0-1],_$[$0-3].first_line,_$[$0-3].first_column)
break;
case 92:
this.$ = sym.EnumType.int;
break;
case 93:
this.$ = sym.EnumType.double;
break;
case 94:
this.$ = sym.EnumType.boolean;
break;
case 95:
this.$ = sym.EnumType.char;
break;
case 96:
this.$ = sym.EnumType.string;
break;
case 101:
console.log("print");
break;
}
},
table: [{2:$V0,3:1,4:2,6:3,10:4,11:5,12:6,17:8,39:10,40:11,41:$V1,77:$V2,78:$V3,79:$V4,80:$V5,81:$V6},{1:[3]},{2:$V0,5:[1,17],6:18,10:4,11:5,12:6,17:8,39:10,40:11,41:$V1,77:$V2,78:$V3,79:$V4,80:$V5,81:$V6},o($V7,[2,3]),o($V7,[2,7]),o($V7,[2,8]),o($V7,[2,9]),{13:[1,19]},{41:[1,20]},{15:[1,23],19:[1,22],42:[1,21]},o($V7,[2,37]),o($V7,[2,38]),o($V8,[2,92]),o($V8,[2,93]),o($V8,[2,94]),o($V8,[2,95]),o($V8,[2,96]),{1:[2,1]},o($V7,[2,2]),o($V7,[2,10]),{13:[1,24],42:[1,25]},{14:26,15:$V9,16:$Va,26:$Vb,33:$Vc,34:$Vd,35:$Ve,36:$Vf,37:$Vg,38:$Vh},{19:[1,36]},{15:[1,37]},o($V7,[2,39]),{14:38,15:$V9,16:$Va,26:$Vb,33:$Vc,34:$Vd,35:$Ve,36:$Vf,37:$Vg,38:$Vh},{13:[1,39],15:$Vi,19:$Vj,20:$Vk,21:$Vl,22:$Vm,23:$Vn,24:$Vo,25:$Vp,27:$Vq,28:$Vr,29:$Vs,30:$Vt,31:$Vu,32:$Vv},{14:54,15:$V9,16:$Va,26:$Vb,33:$Vc,34:$Vd,35:$Ve,36:$Vf,37:$Vg,38:$Vh},{14:56,15:$V9,16:$Va,17:55,26:$Vb,33:$Vc,34:$Vd,35:$Ve,36:$Vf,37:$Vg,38:$Vh,77:$V2,78:$V3,79:$V4,80:$V5,81:$V6},{14:57,15:$V9,16:$Va,26:$Vb,33:$Vc,34:$Vd,35:$Ve,36:$Vf,37:$Vg,38:$Vh},o($Vw,[2,31]),o($Vw,[2,32]),o($Vw,[2,33]),o($Vw,[2,34]),o($Vw,[2,35]),o($Vw,[2,36]),o($V7,[2,110]),o($V7,[2,111]),{13:[1,58],15:$Vi,19:$Vj,20:$Vk,21:$Vl,22:$Vm,23:$Vn,24:$Vo,25:$Vp,27:$Vq,28:$Vr,29:$Vs,30:$Vt,31:$Vu,32:$Vv},o($V7,[2,41]),{14:59,15:$V9,16:$Va,19:[1,60],26:$Vb,33:$Vc,34:$Vd,35:$Ve,36:$Vf,37:$Vg,38:$Vh},{14:61,15:[1,62],16:$Va,26:$Vb,33:$Vc,34:$Vd,35:$Ve,36:$Vf,37:$Vg,38:$Vh},{14:63,15:$V9,16:$Va,26:$Vb,33:$Vc,34:$Vd,35:$Ve,36:$Vf,37:$Vg,38:$Vh},{14:64,15:$V9,16:$Va,26:$Vb,33:$Vc,34:$Vd,35:$Ve,36:$Vf,37:$Vg,38:$Vh},{14:65,15:$V9,16:$Va,26:$Vb,33:$Vc,34:$Vd,35:$Ve,36:$Vf,37:$Vg,38:$Vh},{14:66,15:$V9,16:$Va,26:$Vb,33:$Vc,34:$Vd,35:$Ve,36:$Vf,37:$Vg,38:$Vh},{14:67,15:$V9,16:$Va,26:$Vb,33:$Vc,34:$Vd,35:$Ve,36:$Vf,37:$Vg,38:$Vh},{14:68,15:$V9,16:$Va,26:$Vb,33:$Vc,34:$Vd,35:$Ve,36:$Vf,37:$Vg,38:$Vh},{14:69,15:$V9,16:$Va,26:$Vb,33:$Vc,34:$Vd,35:$Ve,36:$Vf,37:$Vg,38:$Vh},{14:70,15:$V9,16:$Va,26:$Vb,33:$Vc,34:$Vd,35:$Ve,36:$Vf,37:$Vg,38:$Vh},{14:71,15:$V9,16:$Va,26:$Vb,33:$Vc,34:$Vd,35:$Ve,36:$Vf,37:$Vg,38:$Vh},{14:72,15:$V9,16:$Va,26:$Vb,33:$Vc,34:$Vd,35:$Ve,36:$Vf,37:$Vg,38:$Vh},{14:73,15:$V9,16:$Va,26:$Vb,33:$Vc,34:$Vd,35:$Ve,36:$Vf,37:$Vg,38:$Vh},{14:74,15:$V9,16:$Va,26:$Vb,33:$Vc,34:$Vd,35:$Ve,36:$Vf,37:$Vg,38:$Vh},o($Vw,[2,11]),{18:[1,75]},{15:$Vi,18:[1,76],19:$Vj,20:$Vk,21:$Vl,22:$Vm,23:$Vn,24:$Vo,25:$Vp,27:$Vq,28:$Vr,29:$Vs,30:$Vt,31:$Vu,32:$Vv},o($Vx,[2,22],{15:$Vi,19:$Vj,20:$Vk,21:$Vl,22:$Vm,23:$Vn,27:$Vq,28:$Vr,29:$Vs,30:$Vt,31:$Vu,32:$Vv}),o($V7,[2,40]),o($Vy,[2,13],{20:$Vk,21:$Vl,22:$Vm,23:$Vn}),o($Vw,[2,29]),o($Vy,[2,14],{20:$Vk,21:$Vl,22:$Vm,23:$Vn}),o($Vw,[2,30],{14:54,16:$Va,26:$Vb,33:$Vc,34:$Vd,35:$Ve,36:$Vf,37:$Vg,38:$Vh}),o($Vz,[2,15],{22:$Vm}),o($Vz,[2,16],{22:$Vm}),o($Vw,[2,17]),o($Vz,[2,18],{22:$Vm}),o($Vx,[2,20],{15:$Vi,19:$Vj,20:$Vk,21:$Vl,22:$Vm,23:$Vn,27:$Vq,28:$Vr,29:$Vs,30:$Vt,31:$Vu,32:$Vv}),o([13,18,25],[2,21],{15:$Vi,19:$Vj,20:$Vk,21:$Vl,22:$Vm,23:$Vn,24:$Vo,27:$Vq,28:$Vr,29:$Vs,30:$Vt,31:$Vu,32:$Vv}),o($VA,[2,23],{15:$Vi,19:$Vj,20:$Vk,21:$Vl,22:$Vm,23:$Vn}),o($VA,[2,24],{15:$Vi,19:$Vj,20:$Vk,21:$Vl,22:$Vm,23:$Vn}),o($VA,[2,25],{15:$Vi,19:$Vj,20:$Vk,21:$Vl,22:$Vm,23:$Vn}),o($VA,[2,26],{15:$Vi,19:$Vj,20:$Vk,21:$Vl,22:$Vm,23:$Vn}),o($VA,[2,27],{15:$Vi,19:$Vj,20:$Vk,21:$Vl,22:$Vm,23:$Vn}),o($VA,[2,28],{15:$Vi,19:$Vj,20:$Vk,21:$Vl,22:$Vm,23:$Vn}),{14:77,15:$V9,16:$Va,26:$Vb,33:$Vc,34:$Vd,35:$Ve,36:$Vf,37:$Vg,38:$Vh},o($Vw,[2,19]),o($Vw,[2,12])],
defaultActions: {17:[2,1]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse (input) {
    var self = this,
        stack = [0],
        tstack = [], // token stack
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    var args = lstack.slice.call(arguments, 1);

    //this.reductionCount = this.shiftCount = 0;

    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    // copy state
    for (var k in this.yy) {
      if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
        sharedState.yy[k] = this.yy[k];
      }
    }

    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);

    var ranges = lexer.options && lexer.options.ranges;

    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }

    function popStack (n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

_token_stack:
    var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length - 1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

_handle_error:
        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {
            var error_rule_depth;
            var errStr = '';

            // Return the rule stack depth where the nearest error rule can be found.
            // Return FALSE when no error recovery rule was found.
            function locateNearestErrorRecoveryRule(state) {
                var stack_probe = stack.length - 1;
                var depth = 0;

                // try to recover from error
                for(;;) {
                    // check for error recovery rule in this state
                    if ((TERROR.toString()) in table[state]) {
                        return depth;
                    }
                    if (state === 0 || stack_probe < 2) {
                        return false; // No suitable error recovery rule available.
                    }
                    stack_probe -= 2; // popStack(1): [symbol, action]
                    state = stack[stack_probe];
                    ++depth;
                }
            }

            if (!recovering) {
                // first see if there's any chance at hitting an error recovery rule:
                error_rule_depth = locateNearestErrorRecoveryRule(state);

                // Report error
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push("'"+this.terminals_[p]+"'");
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol)+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == EOF ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected,
                    recoverable: (error_rule_depth !== false)
                });
            } else if (preErrorSymbol !== EOF) {
                error_rule_depth = locateNearestErrorRecoveryRule(state);
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol === EOF || preErrorSymbol === EOF) {
                    throw new Error(errStr || 'Parsing halted while starting to recover from another error.');
                }

                // discard current lookahead and grab another
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            if (error_rule_depth === false) {
                throw new Error(errStr || 'Parsing halted. No suitable error recovery rule available.');
            }
            popStack(error_rule_depth);

            preErrorSymbol = (symbol == TERROR ? null : symbol); // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {
            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(lexer.yytext);
                lstack.push(lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = lexer.yyleng;
                    yytext = lexer.yytext;
                    yylineno = lexer.yylineno;
                    yyloc = lexer.yylloc;
                    if (recovering > 0) {
                        recovering--;
                    }
                } else {
                    // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2:
                // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                if (ranges) {
                  yyval._$.range = [lstack[lstack.length-(len||1)].range[0], lstack[lstack.length-1].range[1]];
                }
                r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3:
                // accept
                return true;
        }

    }

    return true;
}};

    const controllador = require("./grammarController");
    const declaration = require("../tree/declaracion");
    const exp = require("../tree/expression");
    const func_call = require("../tree/function_call");
    const func = require("../tree/function");
    const inst = require("../tree/instruccion");
    const paramsIns = require("../tree/parametersIns");
    const sym = require("../enviroment/sym")
    var err;
    var instructionList = controllador.GrammarController.instructionList;
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return "COMA";
break;
case 1:return 13;
break;
case 2:return 56;
break;
case 3:return 16;
break;
case 4:return 18;
break;
case 5:return 66;
break;
case 6:return 67;
break;
case 7:return 8;
break;
case 8:return 9;
break;
case 9:return  'IGUALIGUAL';
break;
case 10:return  'DIFERENTE';
break;
case 11:return  'MENORIGUAL';
break;
case 12:return  'MENOR';
break;
case 13:return  'MAYORIGUAL';
break;
case 14:return  'MAYOR';
break;
case 15:return 19;
break;
case 16:return 15;
break;
case 17:return 20;
break;
case 18:return 21;
break;
case 19:return 22;
break;
case 20:return 23;
break;
case 21:return 42;
break;
case 22:return  'INT';
break;
case 23:return  'DOUBLE';
break;
case 24:return  'BOOL';
break;
case 25:return  'CHAR';
break;
case 26:return  'STRING';
break;
case 27:return  'VOID';
break;
case 28:return  'NEW';
break;
case 29:return  'LIST';
break;
case 30:return 'ADD';
break;
case 31:return 86;
break;
case 32:return 'TOLOWER';
break;
case 33:return 'TOUPER';
break;
case 34:return 'LENGTH';
break;
case 35:return 'TRUNCATE';
break;
case 36:return 'ROUND';
break;
case 37:return 'TYPEOF';
break;
case 38:return 'TOSTRING';
break;
case 39:return 'TOCHARARRAY';
break;
case 40:return 'EXEC'
break;
case 41:return 44;
break;
case 42:return 45;
break;
case 43:return 51;
break;
case 44:return 55;
break;
case 45:return 58;
break;
case 46:return 57;
break;
case 47:return 'CONTINUE';
break;
case 48:return 'RETURN';
break;
case 49:return 64;
break;
case 50:return 60;
break;
case 51:return 62;
break;
case 52:return  'OR';
break;
case 53:return  'AND';
break;
case 54:return  'NOT';
break;
case 55:
break;
case 56:
break;
case 57:return 34;
break;
case 58:return 33;
break;
case 59:return 35;
break;
case 60:return 36
break;
case 61:return 38;
break;
case 62:return 37;
break;
case 63:return 41;
break;
case 64:return 5;
break;
case 65: console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column); 
break;
}
},
rules: [/^(?:,)/i,/^(?:;)/i,/^(?::)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\[)/i,/^(?:\])/i,/^(?:\{)/i,/^(?:\})/i,/^(?:==)/i,/^(?:!=)/i,/^(?:<=)/i,/^(?:<)/i,/^(?:>=)/i,/^(?:>)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:\^)/i,/^(?:%)/i,/^(?:=)/i,/^(?:int\b)/i,/^(?:double\b)/i,/^(?:boolean\b)/i,/^(?:char\b)/i,/^(?:string\b)/i,/^(?:void\b)/i,/^(?:new\b)/i,/^(?:list\b)/i,/^(?:add\b)/i,/^(?:print\b)/i,/^(?:toLower\b)/i,/^(?:toUper\b)/i,/^(?:length\b)/i,/^(?:truncate\b)/i,/^(?:round\b)/i,/^(?:typeof\b)/i,/^(?:toString\b)/i,/^(?:toCharArray\b)/i,/^(?:exec\b)/i,/^(?:if\b)/i,/^(?:else\b)/i,/^(?:switch\b)/i,/^(?:case\b)/i,/^(?:default\b)/i,/^(?:break\b)/i,/^(?:continue\b)/i,/^(?:return\b)/i,/^(?:do\b)/i,/^(?:while\b)/i,/^(?:for\b)/i,/^(?:\|\|)/i,/^(?:&&)/i,/^(?:!)/i,/^(?:[ \r\t])/i,/^(?:\n)/i,/^(?:[0-9]+(\.[0-9]+)\b)/i,/^(?:[0-9]+\b)/i,/^(?:(")([^\"\\]|\\.)*("))/i,/^(?:'([^']*)')/i,/^(?:true\b)/i,/^(?:false\b)/i,/^(?:[a-zA-z_]([0-9a-zA-z_])*)/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = grammar;
exports.Parser = grammar.Parser;
exports.parse = function () { return grammar.parse.apply(grammar, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}