import {Pipe, PipeTransform} from "@angular/core";

export function mockPipe(options: Pipe, mockReturn: any): Pipe {
  const metadata: Pipe = {name: options.name};
  return <any>Pipe(metadata)(class MockPipe implements PipeTransform {
    public transform = () => mockReturn;
  });
}
