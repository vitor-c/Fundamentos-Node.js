import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionDTO{
  title: string
  value: number
  type: 'income' | 'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title,value,type }:CreateTransactionDTO): Transaction {

    if(!['income','outcome'].includes(type)){
      throw Error('Transaction invalid!')
    }

    const { total } = this.transactionsRepository.getBalance()

    if(total < value && type=== 'outcome'){
      throw Error('Insufficient value!')
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value
    })

    return transaction
  }
}

export default CreateTransactionService;
