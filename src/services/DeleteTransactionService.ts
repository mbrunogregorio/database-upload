import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  transaction_id: string;
}

class DeleteTransactionService {
  public async execute({ transaction_id }: Request): Promise<any> {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const checkTransactionExists = await transactionRepository.findOne(
      transaction_id,
    );
    console.log(transaction_id);

    if (!checkTransactionExists) {
      throw new AppError('Transaction not found', 400);
    }

    const result = await transactionRepository.delete(transaction_id);

    return result;
  }
}

export default DeleteTransactionService;
