class Matrix{

constructor(rows, cols){
    this.rows = rows;
    this.cols = cols;
    this.data = [];

    for(let i = 0; i < rows; i++){
        this.data[i] = [];
        for(let j = 0; j < cols; j++){
            this.data[i][j] = 0;
        }
    }
}

static multiply(m1, m2){
    if(m1.cols !== m2.rows){
        console.log('rows A must match cols B');
        return undefined;
    }else{
        let result = new Matrix(m1.rows, m2.cols);
    for(let i = 0; i < result.rows; i++){
        for(let j = 0; j < result.cols; j++){
           for(let k = 0; k < m1.cols; k++){
               result.data[i][j] += m1.data[i][k] * m2.data[k][j];
           }
        }
    }
    return result;
}
}

add(n){

    if(n instanceof Matrix){
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                 this.data[i][j] += n.data[i][j];
            }
        }
    }
else{
    for(let i = 0; i < this.rows; i++){
        for(let j = 0; j < this.cols; j++){
            this.data[i][j] += n; 
        }
    }
}
}

randomize (){
    for(let i = 0; i < this.rows; i++){
        for(let j = 0; j < this.cols; j++){
            this.data[i][j] = Math.random() * 2 - 1;
        }
    }
}

static transpose(matrix){

    let reverseMatrixClone = new Matrix(matrix.cols, matrix.rows);

    for(let i = 0; i < matrix.rows; i++){
        for(let j = 0; j < matrix.cols; j++){
            reverseMatrixClone.data[j][i] = matrix.data[i][j];
        }
    }
    return reverseMatrixClone;   
}

print(){
    console.table(this.data);
}

multiply(n){

    if (n instanceof Matrix) {
        for (var i = 0; i < this.rows; i++) {
          for (var j = 0; j < this.cols; j++) {
            this.data[i][j] *= n.data[i][j];
          }
        }
        // Or just a single scalar value?
      } 
else{
    for(let i = 0; i < this.rows; i++){
        for(let j = 0; j < this.cols; j++){
            this.data[i][j] *= n; 
        }
    }
}
}

static fromArray(array){

    let m = new Matrix(array.length, 1);

  for (let i = 0; i < array.length; i++) {
    m.data[i][0] = array[i];
  }
  return m;
}

toArray(){

    let arr = [];

  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      arr.push(this.data[i][j]);
    }
  }
  return arr;
}

map(fn){
    for(let i = 0; i < this.rows; i++){
        for(let j = 0; j < this.cols; j++){
            let val = this.data[i][j];
            this.data[i][j] = fn(val);
        }
    }
}

static map(matrix, fn){
    
    let result = new Matrix(matrix.rows, matrix.cols);

    for(let i = 0; i < result.rows; i++){
        for(let j = 0; j < result.cols; j++){
            result.data[i][j] = fn(matrix.data[i][j]);
        }
    }
    return result;
}

static substract(a, b){

    let result = new Matrix(a.rows, a.cols);
    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        result.data[i][j] = a.data[i][j] - b.data[i][j];
      }
    }
    return result;
}





}