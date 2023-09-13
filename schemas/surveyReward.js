const itemDiscount = {
  properties: {
    type: { const: 'itemDiscount' },
    rewardName: { type: 'string' },
    rewardDescription: { type: 'string' },
    discountItem: { type: 'string' },
    discount: { type: 'number', minimum: 0, maximum: 1 }
  },
  required: ['type', 'rewardName', 'rewardDescription', 'discountItem', 'discount']
};

const freeItem = {
  properties: {
    type: { const: 'freeItem' },
    rewardName: { type: 'string' },
    rewardDescription: { type: 'string' },
    item: { type: 'string' }
  },
  required: ['type', 'rewardName', 'rewardDescription', 'item']
};

const customReward = {
  properties: {
    type: { const: 'customReward' },
    rewardName: { type: 'string' },
    rewardDescription: { type: 'string' }
  },
  required: ['type', 'rewardName', 'rewardDescription']
};

export default {
  type: 'object',
  properties: {
    rewards: {
      type: 'array',
      items: {
        type: 'object',
        required: ['type', 'rewardName', 'rewardDescription'],
        oneOf: [itemDiscount, freeItem, customReward]
      }
    },
    rewardVariant: { type: 'string', enum: ['first', 'choose', 'random'] },
    expiringTime: { type: 'number', minimum: -1 }
  },
  required: ['rewards', 'rewardVariant', 'expiringTime']
};
