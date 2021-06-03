export enum Player {
    Player1,
    Player2
}

export class Field {
    private _index: number;
    get index(): number {
        return this._index;
    }

    private _numberOfStones: number = 2;
    get numberOfStones(): number {
        return this._numberOfStones;
    }
    set numberOfStones(value: number) {
        this._numberOfStones = value;
    }

    private _nextField: Field | null = null;
    get nextField(): Field | null {
        return this._nextField;
    }
    set nextField(value: Field | null) {
        this._nextField = value;
    }

    private _moveResult: MoveResult | null = null;
    get moveResult(): MoveResult | null {
        return this._moveResult;
    }
    set moveResult(value: MoveResult | null) {
        this._moveResult = value;
    }

    constructor(index: number) {
        this._index = index;
    }

    public makeMove() : MoveResult {
        let moveResult = new MoveResult();

        if (this.numberOfStones > 1) {
            console.log("Starting", this.index, this.numberOfStones);
            let numberOfStonesForMove = this.numberOfStones;
            this.numberOfStones = 0;

            this.nextField!.makeMoveWithStones(numberOfStonesForMove, moveResult);
        }

        return moveResult;
    }

    private makeMoveWithStones(numberOfStonesForMove: number, moveResult: MoveResult) {
        console.log(" makeMoveWithStones", this.index, numberOfStonesForMove);

        if (numberOfStonesForMove <= 0) {
            throw new RangeError("Invalid number of stones: " + numberOfStonesForMove);
        }

        moveResult.numberOfMoves++;

        numberOfStonesForMove--;
        this.numberOfStones++;

        if (numberOfStonesForMove == 0) {
            if (this.numberOfStones > 1) {
                let numberOfStonesForNextMove = this.getNumbersOfStonesForNextMove(moveResult);
    
                this.nextField!.makeMoveWithStones(numberOfStonesForNextMove, moveResult);
            } else {
                console.log("  Finished move", this.index);
            }
        } else {
            this.nextField!.makeMoveWithStones(numberOfStonesForMove, moveResult);
        }
    }

    protected getNumbersOfStonesForNextMove(moveResult: MoveResult) {
        let numberOfStonesForMove = this.numberOfStones;
        this.numberOfStones = 0;

        return numberOfStonesForMove;
    }
}

export class BorderField extends Field {
    private _opponentBorderField: BorderField | null = null;
    get opponentBorderField(): BorderField | null {
        return this._opponentBorderField;
    }
    set opponentBorderField(value: BorderField | null) {
        this._opponentBorderField = value;
    }

    protected getNumbersOfStonesForNextMove(moveResult: MoveResult) {
        let numberOfStonesForMove = super.getNumbersOfStonesForNextMove(moveResult);
        
        let numberOfStonesInOpponentBorderField = this.opponentBorderField!.numberOfStones;
        numberOfStonesForMove += numberOfStonesInOpponentBorderField;

        if (numberOfStonesInOpponentBorderField > 0) {
            this.opponentBorderField!.numberOfStones = 0;

            moveResult.numberOfWonOpponentFields++;
            moveResult.numberOfWonOpponentStones += numberOfStonesInOpponentBorderField;
        }

        return numberOfStonesForMove;
    }
}

export class Board {
    private _fields: Field[] = [];
    get fields(): Field[] {
        return this._fields;
    }

    private _player: Player = Player.Player1;
    get player(): Player {
        return this._player;
    }

    constructor(player: Player) {
        this._player = player;

        this._fields = [
            new BorderField(0),
            new BorderField(1),
            new BorderField(2),
            new BorderField(3),
            new BorderField(4),
            new BorderField(5),
            new BorderField(6),
            new BorderField(7),
            new Field(8),
            new Field(9),
            new Field(10),
            new Field(11),
            new Field(12),
            new Field(13),
            new Field(14),
            new Field(15)
        ];

        for (let i = 0; i < 15; i++) {
            this._fields[i].nextField = this._fields[i + 1];
        }

        this._fields[15].nextField = this._fields[0];
    }

    setOpponentFields(opponentBoard: Board) {
        for (let i = 0; i < 8; i++) {
            (this._fields[i] as BorderField).opponentBorderField = opponentBoard._fields[7 - i] as BorderField;
            (opponentBoard._fields[7 - i] as BorderField).opponentBorderField = this._fields[i] as BorderField;
        }
    }
}

export class MoveResult {
    private _numberOfMoves: number = 0;
    get numberOfMoves(): number {
        return this._numberOfMoves;
    }
    set numberOfMoves(value: number) {
        this._numberOfMoves = value;
    }

    private _numberOfWonOpponentStones: number = 0;
    get numberOfWonOpponentStones(): number {
        return this._numberOfWonOpponentStones;
    }
    set numberOfWonOpponentStones(value: number) {
        this._numberOfWonOpponentStones = value;
    }

    private _numberOfWonOpponentFields: number = 0;
    get numberOfWonOpponentFields(): number {
        return this._numberOfWonOpponentFields;
    }
    set numberOfWonOpponentFields(value: number) {
        this._numberOfWonOpponentFields = value;
    }

    private _isMaximumOfWonOpponentStones: boolean = false;
    get isMaximumOfWonOpponentStones(): boolean {
        return this._isMaximumOfWonOpponentStones;
    }
    private _isMaximumOfWonOpponentFields: boolean = false;
    get isMaximumOfWonOpponentFields(): boolean {
        return this._isMaximumOfWonOpponentFields;
    }

    public static setTopValues(fields: Field[]) {
        let maximumNumberOfWonOpponentStones = 0;
        let maximumNumberOfWonOpponentFields = 0;

        for (let i = 0; i < fields.length; i++) {
            maximumNumberOfWonOpponentStones = Math.max(maximumNumberOfWonOpponentStones, fields[i].moveResult!.numberOfWonOpponentStones);
            maximumNumberOfWonOpponentFields = Math.max(maximumNumberOfWonOpponentFields, fields[i].moveResult!.numberOfWonOpponentFields);
        }

        for (let i = 0; i < fields.length; i++) {
            fields[i].moveResult!._isMaximumOfWonOpponentStones = fields[i].moveResult!.numberOfWonOpponentStones == maximumNumberOfWonOpponentStones;
            fields[i].moveResult!._isMaximumOfWonOpponentFields = fields[i].moveResult!.numberOfWonOpponentFields == maximumNumberOfWonOpponentFields;
        }
    }
}

export class Game {
    private _boardPlayer1: Board;
    get boardPlayer1(): Board {
        return this._boardPlayer1;
    }

    private _boardPlayer2: Board;
    get boardPlayer2(): Board {
        return this._boardPlayer2;
    }

    private _currentBoard: Board;
    get currentBoard(): Board {
        return this._currentBoard;
    }

    constructor(initMoveResult: boolean) {
        this._boardPlayer1 = new Board(Player.Player1);
        this._boardPlayer2 = new Board(Player.Player2);

        this._boardPlayer1.setOpponentFields(this._boardPlayer2);

        this._currentBoard = this._boardPlayer1;

        if (initMoveResult) {
            Game.applyMoveResultToFieldsOfCurrentBoard(this);
        }
    }

    public makeMove(field: Field): Game {
        let game = this.clone();

        for (let i = 0; i < 16; i++) {
            game.currentBoard.fields[i].moveResult = null;
        }

        game.currentBoard.fields[field.index].makeMove();

        // Toggle players
        game._currentBoard = this.currentBoard.player == Player.Player1 ? game.boardPlayer2 : game.boardPlayer1;

        Game.applyMoveResultToFieldsOfCurrentBoard(game);

        return game;
    }

    private static applyMoveResultToFieldsOfCurrentBoard(game: Game) {
        for (let i = 0; i < 16; i++) {
            let cloneForField = game.clone();

            game.currentBoard.fields[i].moveResult = cloneForField.currentBoard.fields[i].makeMove();
        }

        MoveResult.setTopValues(game.currentBoard.fields);
    }

    private clone(): Game {
        let clone = new Game(false);

        for (let i = 0; i < 16; i++) {
            clone._boardPlayer1.fields[i].numberOfStones = this._boardPlayer1.fields[i].numberOfStones;
            clone._boardPlayer2.fields[i].numberOfStones = this._boardPlayer2.fields[i].numberOfStones;
        }

        clone._currentBoard = this.currentBoard.player == Player.Player1 ? clone.boardPlayer1 : clone.boardPlayer2;

        return clone;
    }
}