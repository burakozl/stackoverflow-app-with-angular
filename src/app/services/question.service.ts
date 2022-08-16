import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends BaseService {

  public user:any;
  constructor(private base:BaseService) {
    super(base.http);
  }
  public postQuestions(qustionObj:any){
    return this.postReq('/questions',qustionObj);
  }
  public getQuestions(){
    return this.getReq('/questions');
  }
  public getQuestionsWithId(id:any){
    return this.getReq('/questions/'+id);
  }
  public updateQuestion(newObj:any){
    return this.putReq('/questions/'+newObj.id,newObj)
  }
}
