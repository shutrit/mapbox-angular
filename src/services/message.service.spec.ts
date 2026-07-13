import { TestBed } from "@angular/core/testing";
import { MessageService } from "./message.service";
import { of } from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";
import { initialModel } from "../app/contact-form/contact-form.component";
import { environment } from "../environments/environment";

describe("MessageService", () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MessageService);
  });

  it("should create", () => {
    expect(service).toBeTruthy();
  });
  it("should call the correct url", () => {
    const httpSpy = vi
      .spyOn(TestBed.inject(HttpClient), "post")
      .mockReturnValue(of({} as any));
    service.sendMessage(initialModel);
    expect(httpSpy).toHaveBeenCalledWith(
      environment.apiUrl,
      expect.any(String),
      expect.anything(),
    );
  });
});
