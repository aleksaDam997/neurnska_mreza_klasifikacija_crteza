function sigmoid(x){
    return 1 / (1 + pow(Math.E, -x));
}

function dSigmoid(y){
  //  return sigmoid(x) * (1 - sigmoid(x));
    return y * (1 - y);
}

function tanh(x){
  let y = Math.tanh(x);
  return y;
}

function dTanh(x){
  let y = 1 / (pow(Math.cosh(x), 2));
  return y;
}

function mutat(x){
  if(random(1) < 0.1){
    let offset = randomGaussian() * 0.5;
        // let offset = random(-0.1, 0.1);
    let newX = x + offset;
    return newX;
  }else{
    return x;
  }
}

class NeuralNetwork{

    constructor(inputs_nodes, hidden_nodes, output_nodes){
        this.inputs_nodes = inputs_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;

        this.wheights_ih = new Matrix(this.hidden_nodes, this.inputs_nodes);
        this.wheights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
        this.wheights_ih.randomize();
        this.wheights_ho.randomize();

        this.bias_h = new Matrix(this.hidden_nodes, 1);
        this.bias_o = new Matrix(this.output_nodes, 1);
        this.bias_h.randomize();
        this.bias_o.randomize();

        this.learningRate = 0.1;
    }

    setLearningRate(lr){
      this.learningRate = lr;
    }

    getHiddenWheights(){
      return this.wheights_ih;
    }

    predict(input_array){

        //Generating hidden outputs
        let inputs = Matrix.fromArray(input_array);

        let hidden = Matrix.multiply(this.wheights_ih, inputs);
        hidden.add(this.bias_h);

        //Activation function
        hidden.map(sigmoid);
        //Generating outputs output
        let output = Matrix.multiply(this.wheights_ho, hidden);
        output.add(this.bias_o);
        output.map(sigmoid);
        // Sennding it back to the caller
        return output.toArray();
    }


train(input_array, target_array){

  //  let outputs = this.feedForward(inputs);
 
      //Generating hidden outputs
      let inputs = Matrix.fromArray(input_array);

      let hidden = Matrix.multiply(this.wheights_ih, inputs);
      hidden.add(this.bias_h);

      //Activation function
      hidden.map(sigmoid);
      //Generating outputs output
      let outputs = Matrix.multiply(this.wheights_ho, hidden);
      outputs.add(this.bias_o);
      outputs.map(sigmoid);

    //convert arrays to matrixes

    let targets = Matrix.fromArray(target_array); 

    let output_errors = Matrix.substract(targets, outputs);
    //Calculate gradients
    let gradients = Matrix.map(outputs, dSigmoid);
    gradients.multiply(output_errors);
    gradients.multiply(this.learningRate);
    
    //Calculate deltas
    let hidden_T = Matrix.transpose(hidden);
    let wheights_ho_deltas = Matrix.multiply(gradients, hidden_T);

    //Adjust wheights by deltas
    this.wheights_ho.add(wheights_ho_deltas);
    //Adjust biast by its wheights_ho_deltas
    this.bias_o.add(gradients);
    
    //Cal hidden layer errors
    let who_t = Matrix.transpose(this.wheights_ho);
    let hidden_errors = Matrix.multiply(who_t, output_errors);

    //Cal hidden gradient
    let hidden_gradient = Matrix.map(hidden, dSigmoid);
    hidden_gradient.multiply(hidden_errors);
    hidden_gradient.multiply(this.learningRate);
    
    //Cal input -> hidden deltas
    let inputs_T = Matrix.transpose(inputs);
    let wheights_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);
    
    this.wheights_ih.add(wheights_ih_deltas);
    this.bias_h.add(hidden_gradient);




  //  return something;
}

    

}