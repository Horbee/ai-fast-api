from torch import nn
from transformers import BertModel


class TweetClassifier(nn.Module):
    def __init__(self, n_classes):
        super(TweetClassifier, self).__init__()
        self.bert = BertModel.from_pretrained('bert-base-uncased')
        self.drop = nn.Dropout(p=0.3)
        self.fc = nn.Linear(self.bert.config.hidden_size, n_classes)

    def forward(self, input_ids, attention_mask):
        outputs = self.bert(
            input_ids=input_ids,
            attention_mask=attention_mask
        )
        output = self.drop(outputs[1])
        return self.fc(output)
