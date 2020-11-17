export class result {
    id: number;
	spec: Array<number>;
	rate: number;
    choice: string;
  }

export class result_all {
    age: number;
    gender: string;
	experience: string;
	finish_time: string;
    recorded_result: result[];
}