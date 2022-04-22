import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GameInstruction } from '@/components/GameInstruction';
import { useS2 } from '@/store/useS2';
import { useTech } from '@/store/useTech';
import { toast } from '@/utils/toast';

const items = [
  {
    name: 'ak',
    imgSrc:
      'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_ak47_cu_ak_neon_rider_light_large.9209192b514c4ec98146b4747dec8ce407a977c8.png',
    price: 39.0,
  },
  {
    name: 'm4a4',
    imgSrc:
      'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_m4a1_cu_m4a4_love_light_large.5f7f6a3085aedc1a878dd10881144e7898a2db3d.png',
    price: 27.0,
  },
  {
    name: 'p90',
    imgSrc:
      'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_p90_cu_dragon_p90_bravo_light_large.200ef513ae29ae7651ad3f31e68b5b186279572f.png',
    price: 13.0,
  },
  {
    name: 'awp',
    imgSrc:
      'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_awp_cu_medieval_dragon_awp_light_large.cb3b8168e59e96fd33efa9578206a2aaed036fc0.png',
    price: 38.0,
  },
  {
    name: 'usp',
    imgSrc:
      'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_usp_silencer_cu_usp_kill_confirmed_light_large.a3a7b8f19c9fb931b18c1edd7dd21d44e2c3c2e0.png',
    price: 13.0,
  },
  {
    name: 'vandal',
    imgSrc: '/images/VGP.png',
    price: 12.0,
  },
  {
    name: 'phantom',
    imgSrc: '/images/PRC.png',
    price: 65.0,
  },
];

export const S2: FunctionComponent = () => {
  const { amount } = useS2();
  const navigate = useNavigate();
  const { pass } = useTech();
  const [modalOpen, setModalOpen] = useState<boolean>(true);

  return (
    <div className="w-screen h-screen px-5 pb-5 overflow-x-hidden">
      <GameInstruction
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        text={[
          '组员们需在众多 QR码 中得到相对应的价格',
          '并在界面中完整的使用你的钱购买你所找到的价格',
          'P/S: 若玩家看错或写错价格, 系统将不会警告玩家, 玩家们需自行警惕 😏',
        ]}
      />
      <div className="sticky top-0 bg-black py-3 z-[10]">
        <div className="flex items-center justify-between mb-3">
          <p className="font-mono text-xl tracking-wider text-console">Wallet Amount: </p>
          <div className="rounded-xl border-[2px] border-console text-console font-mono text-xl w-[130px] text-center bg-black">
            RM 500.00
          </div>
        </div>
        <div className="flex justify-between">
          <p className="font-mono text-3xl tracking-wider text-console">Items</p>
          <button
            onClick={() => {
              console.log(amount);
              if (amount !== 0) {
                toast(false);
              } else {
                toast(true);
                navigate('/tech');
                pass(2);
              }
            }}
            className="text-white bg-console rounded-xl w-[150px] py-1"
          >
            Buy
          </button>
        </div>
      </div>
      <div>
        {items.map((i, key) => (
          <ItemCard key={key} price={i.price} imgSrc={i.imgSrc} amount={amount} />
        ))}
      </div>
    </div>
  );
};

interface ItemCardProps {
  imgSrc: string;
  price: number;
  amount: number;
}

const ItemCard: FunctionComponent<ItemCardProps> = ({ imgSrc, price }) => {
  const { amount, setAmount } = useS2();
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    if (quantity !== 10) {
      setQuantity((prev) => prev + 1);
      setAmount(amount - price);
    }
  };

  const handleDecrement = () => {
    if (quantity !== 0) {
      setQuantity((prev) => prev - 1);
      setAmount(amount + price);
    }
  };

  return (
    <div className="flex w-full items-center rounded-lg border-2 border-console p-2 relative mb-2">
      <img
        className="rounded-lg border-[2px] border-console w-[100px] h-[100px] object-contain p-2"
        src={imgSrc}
        alt={imgSrc}
      />
      <div className="flex-col mx-auto">
        <div className="flex items-center justify-center">
          <p className="font-mono text-xl text-console">Price: </p>
          <input
            className="bg-black w-[100px] border-b-2 border-console text-xl font-mono text-console px-2 mb-2"
            placeholder="..."
            type="number"
            maxLength={5}
          ></input>
        </div>

        <div className="flex justify-around ml-5 rounded-lg border-[2px] p-2 border-console mt-1">
          <button onClick={handleDecrement} className="font-mono text-2xl text-console">
            -
          </button>
          <p className="font-mono text-2xl text-console w-[30px] text-center">{quantity}</p>
          <button onClick={handleIncrement} className="font-mono text-2xl text-console">
            +
          </button>
        </div>
      </div>
    </div>
  );
};
