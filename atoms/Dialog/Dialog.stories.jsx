import React, { useState } from 'react';

import PreviewWindow from '../PreviewWindow';

import { getJSMapKeysArray } from '../../cssMaps';

import { Dialog, DialogHeader, DialogContent, DialogFooter } from '..';
import { Typo } from '../Typo';
import Button from '../Button';
import { Separator } from '../Separator';
import { dialogSizeMap } from './Dialog';

const contentText =
  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam asperiores earum voluptatem repellat explicabo temporibus, corrupti quod fugit eveniet iste.';

export default {
  title: 'ATOMS/Dialog',
  component: Dialog,
  argTypes: {
    onClickOutside: {
      action: 'Outside clicked!',
    },
    size: {
      options: getJSMapKeysArray(dialogSizeMap),
    },
    children: {
      control: null,
    },
  },
};

const Template = args => {
  const [isOpen, setOpen] = useState(false);

  return (
    <PreviewWindow>
      <Button onClick={() => setOpen(true)} label='Open modal' />
      <Dialog
        {...args}
        isOpen={isOpen}
        handleClose={() => setOpen(false)}
        onClickOutside={() => setOpen(false)}
      />
    </PreviewWindow>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  size: dialogSizeMap.normal,
  children: contentText,
  showCloseBtn: false,
};

export const Structured = Template.bind({});
Structured.args = {
  size: dialogSizeMap.normal,
  children: (
    <>
      <DialogHeader>Dialog Header</DialogHeader>
      <Separator />
      <DialogContent>
        <Typo label={contentText} />
      </DialogContent>
      <Separator />
      <DialogFooter>
        <span>Dialog Footer</span>
      </DialogFooter>
    </>
  ),
};

export const BigContent = Template.bind({});
BigContent.args = {
  size: dialogSizeMap.normal,
  maxHeight: false,
  children: (
    <>
      <DialogHeader>Dialog Header</DialogHeader>
      <Separator />
      <DialogContent>
        <Typo
          label='Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis,
        architecto excepturi? Veniam sit, numquam dolor ab necessitatibus rerum
        possimus enim est. Sit consequuntur perspiciatis nemo maxime
        voluptatibus fuga eius neque, impedit, ipsam eum doloribus quas sequi
        atque unde accusantium suscipit placeat vero! Quasi laborum officiis
        vitae saepe eum adipisci blanditiis porro assumenda esse asperiores,
        illo dicta doloremque. Voluptatem sapiente similique at magni impedit?
        Consequatur eos illum, libero, quaerat ab soluta in voluptate quo
        dolorum expedita quod dolore ratione possimus laboriosam sunt iure a
        cumque quisquam earum atque alias? Explicabo, necessitatibus
        reprehenderit? Unde, et aut aspernatur eligendi possimus labore autem
        repellat expedita officiis. Repellendus officiis neque facere inventore
        fugiat maxime autem? Quos, accusantium est? Molestias non adipisci
        doloribus provident sint blanditiis optio numquam soluta! Eum quasi
        architecto maxime repudiandae? Minus dolores atque omnis praesentium,
        cupiditate hic veniam voluptatem dolore obcaecati nulla numquam, ducimus
        ratione perspiciatis blanditiis voluptate quaerat distinctio. Vel
        aperiam voluptates neque maiores cumque quae magni. Libero laborum
        praesentium molestias. Aspernatur quisquam nam ipsa explicabo dicta
        perferendis ex, ducimus harum ullam pariatur alias facere molestiae sit
        odio neque et aperiam voluptates magnam ea architecto, delectus
        officiis, eius amet assumenda. Repellat fugiat adipisci sequi, magnam
        dolore aliquam facere corporis doloremque provident. Lorem ipsum dolor
        sit amet consectetur adipisicing elit. Reiciendis, architecto excepturi?
        Veniam sit, numquam dolor ab necessitatibus rerum possimus enim est. Sit
        consequuntur perspiciatis nemo maxime voluptatibus fuga eius neque,
        impedit, ipsam eum doloribus quas sequi atque unde accusantium suscipit
        placeat vero! Quasi laborum officiis vitae saepe eum adipisci blanditiis
        porro assumenda esse asperiores, illo dicta doloremque. Voluptatem
        sapiente similique at magni impedit? Consequatur eos illum, libero,
        quaerat ab soluta in voluptate quo dolorum expedita quod dolore ratione
        possimus laboriosam sunt iure a cumque quisquam earum atque alias?
        Explicabo, necessitatibus reprehenderit? Unde, et aut aspernatur
        eligendi possimus labore autem repellat expedita officiis. '
        />
      </DialogContent>
      <Separator />
      <DialogFooter>
        <span>Dialog Footer</span>
      </DialogFooter>
    </>
  ),
};

export const FormDialog = Template.bind({});
FormDialog.args = {
  size: dialogSizeMap.normal,
  maxHeight: false,
  children: (
    <>
      <DialogHeader>
        <Typo preset='heading2' fontSize='heading2' label='Form Title' fluid />
        <Typo label='Form Subtitle' fluid />
      </DialogHeader>
      <Separator />
      <DialogContent>
        <Typo
          label='Quos, accusantium est? Molestias non adipisci doloribus provident sint
        blanditiis optio numquam soluta! Eum quasi architecto maxime
        repudiandae? Minus dolores atque omnis praesentium, cupiditate hic
        veniam voluptatem dolore obcaecati nulla numquam, ducimus ratione
        perspiciatis blanditiis voluptate quaerat distinctio. Vel aperiam
        voluptates neque maiores cumque quae magni. Libero laborum praesentium
        molestias. Aspernatur quisquam nam ipsa explicabo dicta perferendis ex,
        ducimus harum ullam pariatur alias facere molestiae sit odio neque et
        aperiam voluptates magnam ea architecto, delectus officiis, eius amet
        assumenda. Repellat fugiat adipisci sequi, magnam dolore aliquam facere
        corporis doloremque provident. Quos, accusantium est? Molestias non adipisci doloribus provident sint
        blanditiis optio numquam soluta! Eum quasi architecto maxime
        repudiandae? Minus dolores atque omnis praesentium, cupiditate hic
        veniam voluptatem dolore obcaecati nulla numquam, ducimus ratione
        perspiciatis blanditiis voluptate quaerat distinctio. Vel aperiam
        voluptates neque maiores cumque quae magni. Libero laborum praesentium
        molestias. Aspernatur quisquam nam ipsa explicabo dicta perferendis ex,
        ducimus harum ullam pariatur alias facere molestiae sit odio neque et
        aperiam voluptates magnam ea architecto, delectus officiis, eius amet
        assumenda. Repellat fugiat adipisci sequi, magnam dolore aliquam facere
        corporis doloremque provident. Quos, accusantium est? Molestias non adipisci doloribus provident sint
        blanditiis optio numquam soluta! Eum quasi architecto maxime
        repudiandae? Minus dolores atque omnis praesentium, cupiditate hic
        veniam voluptatem dolore obcaecati nulla numquam, ducimus ratione
        perspiciatis blanditiis voluptate quaerat distinctio. Vel aperiam
        voluptates neque maiores cumque quae magni. Libero laborum praesentium
        molestias. Aspernatur quisquam nam ipsa explicabo dicta perferendis ex,
        ducimus harum ullam pariatur alias facere molestiae sit odio neque et
        aperiam voluptates magnam ea architecto, delectus officiis, eius amet
        assumenda. Repellat fugiat adipisci sequi, magnam dolore aliquam facere
        corporis doloremque provident. Quos, accusantium est? Molestias non adipisci doloribus provident sint
        blanditiis optio numquam soluta! Eum quasi architecto maxime
        repudiandae? Minus dolores atque omnis praesentium, cupiditate hic
        veniam voluptatem dolore obcaecati nulla numquam, ducimus ratione
        perspiciatis blanditiis voluptate quaerat distinctio. Vel aperiam
        voluptates neque maiores cumque quae magni. Libero laborum praesentium
        molestias. Aspernatur quisquam nam ipsa explicabo dicta perferendis ex,
        ducimus harum ullam pariatur alias facere molestiae sit odio neque et
        aperiam voluptates magnam ea architecto, delectus officiis, eius amet
        assumenda. Repellat fugiat adipisci sequi, magnam dolore aliquam facere
        corporis doloremque provident.'
        />
      </DialogContent>
      <Separator />
      <DialogFooter alignItems='center' justifyContent='end'>
        <Button preset='secondary' label='Cancel' />
        <Button preset='primary' label='Ok' />
      </DialogFooter>
    </>
  ),
};
